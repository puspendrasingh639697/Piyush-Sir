import express from 'express';
import { checkout, paymentVerification } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Pehle user login check hoga (protect), fir checkout hoga
router.post('/checkout', protect, checkout);
router.post('/verify', protect, paymentVerification);

export default router;