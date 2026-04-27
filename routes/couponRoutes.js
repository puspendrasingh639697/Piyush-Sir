// import express from 'express';
// import { createCoupon } from '../controllers/couponController.js'; // Path check kar lena
// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Sirf Admin hi coupon bana sakta hai
// router.post('/create', protect, adminOnly, createCoupon);

// export default router;

import express from 'express';
import { 
    createCoupon, 
    applyCoupon, 
    markCouponAsUsed,
    getAllCoupons,
    deleteCoupon,
    getUserVouchers
} from '../controllers/couponController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ User routes
router.post('/apply', protect, applyCoupon);
router.post('/mark-used', protect, markCouponAsUsed);
router.get('/my-vouchers', protect, getUserVouchers);

// ✅ Admin routes
router.post('/create', protect, adminOnly, createCoupon);
router.get('/admin/all', protect, adminOnly, getAllCoupons);
router.delete('/admin/:id', protect, adminOnly, deleteCoupon);

export default router;