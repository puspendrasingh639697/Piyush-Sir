// controllers/adminController.js
import User from '../models/User.js';
import Order from '../models/Order.js';

// ✅ Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    console.log("--- Admin: Fetching All Users ---");
    try {
        const users = await User.find().select('-password'); // Password hide karo
        console.log(`✅ Total ${users.length} users found`);
        res.status(200).json(users);
    } catch (error) {
        console.log("🔥 Error fetching users:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
    console.log("--- Admin: Fetching All Orders ---");
    try {
        const orders = await Order.find()
            .populate('user', 'name email') // User details bhi chahiye
            .sort({ createdAt: -1 });
        console.log(`✅ Total ${orders.length} orders found`);
        res.status(200).json(orders);
    } catch (error) {
        console.log("🔥 Error fetching orders:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('user', 'email');
        
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Shipping Update Notification (Point 3.11)
        if (status === 'Shipped') {
            await sendEmail({
                email: order.user.email,
                subject: "Your Order is on the way! 🚚",
                message: `Great news! Your order ${order._id} has been shipped.`
            });
        }

        res.status(200).json({ message: "Status updated!", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete user (Admin only)
export const deleteUser = async (req, res) => {
    console.log("--- Admin: Deleting User ---");
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(`✅ User ${user.email} deleted`);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("🔥 Error deleting user:", error.message);
        res.status(500).json({ message: error.message });
    }
};