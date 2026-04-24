import express from 'express';
import { createCoupon } from '../controllers/couponController.js'; // Path check kar lena
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Sirf Admin hi coupon bana sakta hai
router.post('/create', protect, adminOnly, createCoupon);

export default router;