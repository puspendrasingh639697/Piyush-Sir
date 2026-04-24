import express from 'express';
import { updateContent, getContentByType } from '../controllers/contentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js'; 

const router = express.Router();

// ✅ Admin Only: Content update (Banner image ke saath)
// URL: POST http://localhost:5000/api/content/update
router.post('/update', protect, adminOnly, upload.single('image'), updateContent);

// ✅ Public Route: Content fetch karne ke liye (About, Banner, etc.)
// URL: GET http://localhost:5000/api/content/:type
router.get('/:type', getContentByType);

export default router;