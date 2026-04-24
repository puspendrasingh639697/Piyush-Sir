import Coupon from '../models/Coupon.js';

// Naya Coupon Banana (Admin Only)
export const createCoupon = async (req, res) => {
    try {
        const { code, discountPercent, isFirstOrderOnly } = req.body;
        const coupon = await Coupon.create({ code, discountPercent, isFirstOrderOnly });
        res.status(201).json({ success: true, message: "Coupon Created!", coupon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};