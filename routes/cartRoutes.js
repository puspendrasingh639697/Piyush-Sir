import express from 'express';
import { addToCart, getCart, removeFromCart, updateCartQuantity } from '../controllers/cartController.js';

const router = express.Router();

// Sabse pehle testing ke liye bina protection ke chala lo, 
// baad mein 'protect' middleware laga dena.

router.post('/add', addToCart); // Add ya Increment
router.get('/:userId', getCart); // Puri cart dekhne ke liye
router.put('/update', updateCartQuantity); // Quantity change ke liye
router.delete('/remove/:userId/:productId', removeFromCart); // Delete ke liye

export default router;