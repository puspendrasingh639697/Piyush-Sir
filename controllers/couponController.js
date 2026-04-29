

// import Coupon from '../models/Coupon.js';
// import Order from '../models/Order.js';

// // ✅ Create Voucher/Coupon (Admin)
// export const createCoupon = async (req, res) => {
//     try {
//         const { 
//             code, discountPercent, description, isFirstOrderOnly, 
//             maxUsage, minOrderAmount, expiresAt, voucherType, fixedAmount 
//         } = req.body;
        
//         const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
//         if (existingCoupon) {
//             return res.status(400).json({ message: "Voucher code already exists!" });
//         }
        
//         const coupon = await Coupon.create({
//             code: code.toUpperCase(),
//             discountPercent: discountPercent || 0,
//             description,
//             isFirstOrderOnly: isFirstOrderOnly || false,
//             maxUsage: maxUsage || 1,
//             minOrderAmount: minOrderAmount || 0,
//             expiresAt: expiresAt || null,
//             voucherType: voucherType || 'discount',
//             fixedAmount: fixedAmount || 0,
//             usedBy: [],
//             usedCount: 0
//         });
        
//         res.status(201).json({ 
//             success: true, 
//             message: "Voucher Created Successfully!", 
//             coupon 
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // ✅ Apply Voucher/Coupon
// export const applyCoupon = async (req, res) => {
//     try {
//         const { code, orderAmount } = req.body;  // ✅ CHANGE 1
//         const userId = req.user._id;
        
//         const coupon = await Coupon.findOne({ 
//             code: code.toUpperCase(), 
//             isActive: true 
//         });
        
//         if (!coupon) {
//             return res.status(400).json({ message: "Invalid voucher code!" });
//         }
        
//         // ✅ Check expiry
//         if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
//             return res.status(400).json({ message: "Voucher has expired!" });
//         }
        
//         // ✅ Check minimum order amount
//         if (orderAmount < coupon.minOrderAmount) {  // ✅ CHANGE 2
//             return res.status(400).json({ 
//                 message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this voucher!` 
//             });
//         }
        
//         // ✅ Check if user already used this voucher
//         const alreadyUsed = coupon.usedBy.some(u => u.userId.toString() === userId.toString());
//         if (alreadyUsed) {
//             return res.status(400).json({ message: "You have already used this voucher!" });
//         }
        
//         // ✅ Check max usage limit
//         if (coupon.usedCount >= coupon.maxUsage) {
//             return res.status(400).json({ message: "Voucher has reached its usage limit!" });
//         }
        
//         // ✅ Check if first order only
//         if (coupon.isFirstOrderOnly) {
//             const userOrders = await Order.countDocuments({ user: userId });
//             if (userOrders > 0) {
//                 return res.status(400).json({ message: "This voucher is only for first order!" });
//             }
//         }
        
//         // Calculate discount
//         let discountAmount = 0;
//         let finalAmount = orderAmount;  // ✅ CHANGE 3
        
//         if (coupon.voucherType === 'discount') {
//             discountAmount = (orderAmount * coupon.discountPercent) / 100;  // ✅ CHANGE 4
//             finalAmount = orderAmount - discountAmount;
//         } else if (coupon.voucherType === 'fixed_amount') {
//             discountAmount = Math.min(coupon.fixedAmount, orderAmount);
//             finalAmount = orderAmount - discountAmount;
//         } else if (coupon.voucherType === 'free_shipping') {
//             discountAmount = 0;
//             finalAmount = orderAmount;
//         }
        
//         res.json({
//             success: true,
//             coupon: {
//                 _id: coupon._id,
//                 code: coupon.code,
//                 discountPercent: coupon.discountPercent,
//                 voucherType: coupon.voucherType,
//                 fixedAmount: coupon.fixedAmount,
//                 description: coupon.description
//             },
//             discountAmount,
//             finalAmount: finalAmount > 0 ? finalAmount : 0,
//             couponId: coupon._id
//         });
        
//     } catch (error) {
//         console.error("Apply Coupon Error:", error);  // ✅ Debug log
//         res.status(500).json({ message: error.message });
//     }
// };

// // ✅ Mark Voucher as Used (After Order)
// export const markCouponAsUsed = async (req, res) => {
//     try {
//         const { couponId, orderId } = req.body;
//         const userId = req.user._id;
        
//         const coupon = await Coupon.findById(couponId);
//         if (!coupon) {
//             return res.status(404).json({ message: "Voucher not found!" });
//         }
        
//         coupon.usedBy.push({ userId, usedAt: new Date(), orderId });
//         coupon.usedCount += 1;
//         await coupon.save();
        
//         res.json({ success: true, message: "Voucher marked as used!" });
        
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // ✅ Get All Vouchers (Admin)
// export const getAllCoupons = async (req, res) => {
//     try {
//         const coupons = await Coupon.find()
//             .sort({ createdAt: -1 })
//             .populate('usedBy.userId', 'name email');
//         res.json({ success: true, coupons });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // ✅ Get User's Used Vouchers
// export const getUserVouchers = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const coupons = await Coupon.find({
//             'usedBy.userId': userId
//         }).select('code discountPercent usedBy');
        
//         res.json({ success: true, coupons });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // ✅ Delete Voucher (Admin)
// export const deleteCoupon = async (req, res) => {
//     try {
//         const coupon = await Coupon.findByIdAndDelete(req.params.id);
//         if (!coupon) {
//             return res.status(404).json({ message: "Voucher not found!" });
//         }
//         res.json({ success: true, message: "Voucher deleted!" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // ✅ Toggle Coupon Status (Activate/Deactivate)
// export const toggleCouponStatus = async (req, res) => {
//     try {
//         const coupon = await Coupon.findById(req.params.id);
        
//         if (!coupon) {
//             return res.status(404).json({ message: "Coupon not found!" });
//         }
        
//         coupon.isActive = !coupon.isActive;
//         await coupon.save();
        
//         res.json({ 
//             success: true, 
//             message: `Coupon ${coupon.isActive ? 'activated' : 'deactivated'} successfully!`,
//             coupon 
//         });
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
        
        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }
        
        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
            return res.status(400).json({ message: "Voucher code already exists!" });
        }
        
        const coupon = await Coupon.create({
            code: code.toUpperCase(),
            discountPercent: discountPercent || 0,
            description: description || '',
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
        console.error("Create Coupon Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Apply Voucher/Coupon (FIXED - with null check)
export const applyCoupon = async (req, res) => {
    console.log("=== RAW REQUEST BODY ===");
    console.log(req.body);
    console.log("Content-Type:", req.headers['content-type']);
    
    const { code, orderAmount } = req.body;
    console.log("Destructured code:", code);
    console.log("Destructured orderAmount:", orderAmount);
    try {
        const { code, orderAmount } = req.body;
        const userId = req.user?._id;
        
        // ✅ FIX: Check if code exists
        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }
        
        // ✅ FIX: Check if orderAmount is valid
        if (!orderAmount || orderAmount <= 0) {
            return res.status(400).json({ message: "Valid order amount is required" });
        }
        
        // ✅ FIX: Check if user is logged in
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        
        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(), 
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
        if (orderAmount < coupon.minOrderAmount) {
            return res.status(400).json({ 
                message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this voucher!` 
            });
        }
        
        // ✅ Check if user already used this voucher
        const alreadyUsed = coupon.usedBy?.some(u => u.userId?.toString() === userId.toString());
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
        let finalAmount = orderAmount;
        
        if (coupon.voucherType === 'discount') {
            discountAmount = (orderAmount * coupon.discountPercent) / 100;
            finalAmount = orderAmount - discountAmount;
        } else if (coupon.voucherType === 'fixed_amount') {
            discountAmount = Math.min(coupon.fixedAmount, orderAmount);
            finalAmount = orderAmount - discountAmount;
        } else if (coupon.voucherType === 'free_shipping') {
            discountAmount = 0;
            finalAmount = orderAmount;
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
        console.error("Apply Coupon Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Mark Voucher as Used (After Order)
export const markCouponAsUsed = async (req, res) => {
    try {
        const { couponId, orderId } = req.body;
        const userId = req.user?._id;
        
        if (!couponId || !orderId) {
            return res.status(400).json({ message: "Coupon ID and Order ID are required" });
        }
        
        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.status(404).json({ message: "Voucher not found!" });
        }
        
        coupon.usedBy.push({ userId, usedAt: new Date(), orderId });
        coupon.usedCount += 1;
        await coupon.save();
        
        res.json({ success: true, message: "Voucher marked as used!" });
        
    } catch (error) {
        console.error("Mark Coupon Used Error:", error);
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
        console.error("Get All Coupons Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get User's Used Vouchers
export const getUserVouchers = async (req, res) => {
    try {
        const userId = req.user?._id;
        
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        
        const coupons = await Coupon.find({
            'usedBy.userId': userId
        }).select('code discountPercent usedBy');
        
        res.json({ success: true, coupons });
    } catch (error) {
        console.error("Get User Vouchers Error:", error);
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
        console.error("Delete Coupon Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Toggle Coupon Status (Activate/Deactivate)
export const toggleCouponStatus = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found!" });
        }
        
        coupon.isActive = !coupon.isActive;
        await coupon.save();
        
        res.json({ 
            success: true, 
            message: `Coupon ${coupon.isActive ? 'activated' : 'deactivated'} successfully!`,
            coupon 
        });
    } catch (error) {
        console.error("Toggle Coupon Status Error:", error);
        res.status(500).json({ message: error.message });
    }
};