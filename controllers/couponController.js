// import Coupon from '../models/Coupon.js';

// // Naya Coupon Banana (Admin Only)
// export const createCoupon = async (req, res) => {
//     try {
//         const { code, discountPercent, isFirstOrderOnly } = req.body;
//         const coupon = await Coupon.create({ code, discountPercent, isFirstOrderOnly });
//         res.status(201).json({ success: true, message: "Coupon Created!", coupon });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


import Coupon from '../models/Coupon.js';
import Order from '../models/Order.js';

// ✅ Create Voucher/Coupon (Admin)
export const createCoupon = async (req, res) => {
    try {
        const { 
            code, discountPercent, description, isFirstOrderOnly, 
            maxUsage, minOrderAmount, expiresAt, voucherType, fixedAmount 
        } = req.body;
        
        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
            return res.status(400).json({ message: "Voucher code already exists!" });
        }
        
        const coupon = await Coupon.create({
            code: code.toUpperCase(),
            discountPercent: discountPercent || 0,
            description,
            isFirstOrderOnly: isFirstOrderOnly || false,
            maxUsage: maxUsage || 1,
            minOrderAmount: minOrderAmount || 0,
            expiresAt: expiresAt || null,
            voucherType: voucherType || 'discount',
            fixedAmount: fixedAmount || 0,
            usedBy: [],
            usedCount: 0
        });
        
        res.status(201).json({ 
            success: true, 
            message: "Voucher Created Successfully!", 
            coupon 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Apply Voucher/Coupon
export const applyCoupon = async (req, res) => {
    try {
        const { couponCode, totalAmount } = req.body;
        const userId = req.user._id;
        
        const coupon = await Coupon.findOne({ 
            code: couponCode.toUpperCase(), 
            isActive: true 
        });
        
        if (!coupon) {
            return res.status(400).json({ message: "Invalid voucher code!" });
        }
        
        // ✅ Check expiry
        if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
            return res.status(400).json({ message: "Voucher has expired!" });
        }
        
        // ✅ Check minimum order amount
        if (totalAmount < coupon.minOrderAmount) {
            return res.status(400).json({ 
                message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this voucher!` 
            });
        }
        
        // ✅ Check if user already used this voucher
        const alreadyUsed = coupon.usedBy.some(u => u.userId.toString() === userId.toString());
        if (alreadyUsed) {
            return res.status(400).json({ message: "You have already used this voucher!" });
        }
        
        // ✅ Check max usage limit
        if (coupon.usedCount >= coupon.maxUsage) {
            return res.status(400).json({ message: "Voucher has reached its usage limit!" });
        }
        
        // ✅ Check if first order only
        if (coupon.isFirstOrderOnly) {
            const userOrders = await Order.countDocuments({ user: userId });
            if (userOrders > 0) {
                return res.status(400).json({ message: "This voucher is only for first order!" });
            }
        }
        
        // Calculate discount
        let discountAmount = 0;
        let finalAmount = totalAmount;
        
        if (coupon.voucherType === 'discount') {
            discountAmount = (totalAmount * coupon.discountPercent) / 100;
            finalAmount = totalAmount - discountAmount;
        } else if (coupon.voucherType === 'fixed_amount') {
            discountAmount = Math.min(coupon.fixedAmount, totalAmount);
            finalAmount = totalAmount - discountAmount;
        } else if (coupon.voucherType === 'free_shipping') {
            discountAmount = 0;
            finalAmount = totalAmount;
        }
        
        res.json({
            success: true,
            coupon: {
                _id: coupon._id,
                code: coupon.code,
                discountPercent: coupon.discountPercent,
                voucherType: coupon.voucherType,
                fixedAmount: coupon.fixedAmount,
                description: coupon.description
            },
            discountAmount,
            finalAmount: finalAmount > 0 ? finalAmount : 0,
            couponId: coupon._id
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Mark Voucher as Used (After Order)
export const markCouponAsUsed = async (req, res) => {
    try {
        const { couponId, orderId } = req.body;
        const userId = req.user._id;
        
        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.status(404).json({ message: "Voucher not found!" });
        }
        
        coupon.usedBy.push({ userId, usedAt: new Date(), orderId });
        coupon.usedCount += 1;
        await coupon.save();
        
        res.json({ success: true, message: "Voucher marked as used!" });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get All Vouchers (Admin)
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find()
            .sort({ createdAt: -1 })
            .populate('usedBy.userId', 'name email');
        res.json({ success: true, coupons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get User's Used Vouchers
export const getUserVouchers = async (req, res) => {
    try {
        const userId = req.user._id;
        const coupons = await Coupon.find({
            'usedBy.userId': userId
        }).select('code discountPercent usedBy');
        
        res.json({ success: true, coupons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete Voucher (Admin)
export const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: "Voucher not found!" });
        }
        res.json({ success: true, message: "Voucher deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};