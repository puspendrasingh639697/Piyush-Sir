// routes/adminRoutes.js
import express from 'express';
import { 
    getAllUsers, 
    getAllOrders, 
    updateOrderStatus,
    deleteUser 
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Sab routes Admin ke liye (protect + adminOnly)
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/orders', protect, adminOnly, getAllOrders);
router.put('/orders/:id', protect, adminOnly, updateOrderStatus);
router.delete('/users/:id', protect, adminOnly, deleteUser);

export default router;