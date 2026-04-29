

// import express from 'express';
// import { 
//     createCoupon, 
//     applyCoupon, 
//     markCouponAsUsed,
//     getAllCoupons,
//     deleteCoupon,
//     getUserVouchers
// } from '../controllers/couponController.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // ✅ User routes
// router.post('/apply', protect, applyCoupon);
// router.post('/mark-used', protect, markCouponAsUsed);
// router.get('/my-vouchers', protect, getUserVouchers);

// // ✅ Admin routes
// router.post('/create', protect, adminOnly, createCoupon);
// router.get('/admin/all', protect, adminOnly, getAllCoupons);
// router.delete('/admin/:id', protect, adminOnly, deleteCoupon);

// export default router;


import express from 'express';
import { 
    createCoupon, 
    applyCoupon, 
    markCouponAsUsed,
    getAllCoupons,
    deleteCoupon,
    getUserVouchers,
    toggleCouponStatus      // ✅ Ye import add karo
} from '../controllers/couponController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/apply', protect, applyCoupon);
router.post('/mark-used', protect, markCouponAsUsed);
router.get('/my-vouchers', protect, getUserVouchers);

// Admin routes
router.post('/create', protect, adminOnly, createCoupon);
router.get('/admin/all', protect, adminOnly, getAllCoupons);
router.delete('/admin/:id', protect, adminOnly, deleteCoupon);
router.put('/admin/:id/toggle', protect, adminOnly, toggleCouponStatus);  // ✅ Ye line add karo

export default router;