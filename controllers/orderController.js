import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import Coupon from '../models/Coupon.js';

// Temporary notification function (agar nahi hai toh)
const createNotification = async (userId, title, message, type, orderId) => {
    console.log("📢 Notification:", { userId, title, message, type, orderId });
    return true;
};

// Temporary email function (agar nahi hai toh)
const sendEmail = async ({ email, subject, message }) => {
    console.log("📧 Email to:", email, "Subject:", subject);
    console.log("Message:", message);
    return true;
};

// ✅ Create Order

// ✅ Create Order (With Coupon Support)
export const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, totalPrice, paymentMethod, couponId } = req.body;
        
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "Bhai, cart khali hai!" });
        }

        // Stock check
        for (const item of orderItems) {
            const product = await Product.findById(item.productId);
            if (!product || product.stock < item.qty) {
                return res.status(400).json({ message: `Sorry, ${product ? product.name : 'Product'} out of stock hai!` });
            }
        }

        const order = await Order.create({
            user: req.user._id, 
            orderItems, 
            shippingAddress,
            totalPrice,
            paymentMethod: paymentMethod || 'COD',
            couponUsed: couponId || null  // ✅ Add this
        });

        // Stock reduction logic
        for (const item of orderItems) {
            const product = await Product.findById(item.productId);
            product.stock -= item.qty;
            await product.save();
        }

        // ✅ MARK COUPON AS USED (Add this block)
        if (couponId) {
            try {
                await Coupon.findByIdAndUpdate(couponId, {
                    $push: { usedBy: { userId: req.user._id, orderId: order._id, usedAt: new Date() } },
                    $inc: { usedCount: 1 }
                });
                console.log(`✅ Coupon ${couponId} marked as used by user ${req.user._id}`);
            } catch (couponErr) {
                console.log("Coupon mark error:", couponErr.message);
            }
        }

        const orderIdShort = order._id.toString().slice(-8);
        
        // ✅ ADD NOTIFICATION HERE
        try {
            await createNotification(
                req.user._id,
                'Order Confirmed! 🎉',
                `Your order #${orderIdShort} has been placed successfully.`,
                'success',
                order._id
            );
        } catch (notifErr) {
            console.log("Notification error:", notifErr.message);
        }

        // Send Order Confirmation Email
        try {
            await sendEmail({
                email: req.user.email,
                subject: "Order Placed! 🎉 - Noida E-Shop",
                message: `Hello ${req.user.name}, your order for ₹${totalPrice} has been placed. Order ID: ${order._id}`
            });
        } catch (err) { 
            console.log("Email error:", err.message); 
        }

        await Cart.findOneAndDelete({ userId: req.user._id });
        res.status(201).json({ message: "Order Placed! 🎉", order });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ✅ Get My Orders
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get My Orders Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Order By ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: "Bhai, ye tera order nahi hai!" });
            }
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order nahi mila!" });
        }
    } catch (error) {
        console.error("Get Order By ID Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Cancel Order
export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order && order.status === 'Processing') {
            order.status = 'Cancelled';
            order.isCancelled = true;
            order.cancelledAt = Date.now();
            await order.save();

            // Restore stock
            for (const item of order.orderItems) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.stock += item.qty;
                    await product.save();
                }
            }
            res.status(200).json({ message: "Order Cancelled & Stock Updated! ✅" });
        } else {
            res.status(400).json({ message: "Order cancel nahi ho sakta!" });
        }
    } catch (error) {
        console.error("Cancel Order Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Admin: Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get All Orders Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Admin: Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order nahi mila!" });
        }
        const newStatus = req.body.status || order.status;
        order.status = newStatus;
        if (newStatus === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }
        await order.save();
        res.status(200).json({ success: true, message: "Status updated!", order });
    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Admin: Process Refund
export const processRefund = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order && order.status === 'Cancelled' && order.isPaid) {
            order.status = 'Refunded';
            await order.save();
            res.status(200).json({ message: "Refund Processed! 💰" });
        } else {
            res.status(400).json({ message: "Refund ki shartein poori nahi hain!" });
        }
    } catch (error) {
        console.error("Process Refund Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Admin: Dashboard Stats
export const getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        
        const orders = await Order.find({ isPaid: true });
        const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);

        res.json({
            success: true,
            stats: {
                totalOrders,
                totalUsers,
                totalProducts,
                totalRevenue
            }
        });
    } catch (error) {
        console.error("Get Admin Stats Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};