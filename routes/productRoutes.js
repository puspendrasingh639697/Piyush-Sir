import express from 'express';
import { createProductReview } from '../controllers/productController.js';
import { 
    addProduct, 
    getProducts, 
    updateProduct, 
    getProductById,
    deleteProduct 
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js'; 

const router = express.Router();

// ✅ Public Routes (Login ki zaroorat nahi)
router.get('/all', getProducts);
router.get('/:id', getProductById);  // YEH LINE SABSE IMPORTANT HAI

// ✅ Admin Only Routes
router.post('/add', protect, adminOnly, upload.single('image'), addProduct); 
router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct); 
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/:id/reviews', protect, createProductReview);

export default router;