// // import express from 'express';
// // import { 
// //     getProducts,
// //     getProductById,
// //     addProduct,
// //     updateProduct,
// //     deleteProduct
// // } from '../controllers/productController.js';
// // import { protect, restrictTo } from '../middleware/authMiddleware.js';
// // import upload from '../middleware/uploadMiddleware.js';  // ✅ YEH LINE ADD KARO

// // const router = express.Router();

// // // =======================
// // //   PUBLIC ROUTES
// // // =======================
// // router.get('/all', getProducts);
// // router.get('/:id', getProductById);

// // // =======================
// // //   PROTECTED ADMIN ROUTES (RBAC)
// // // =======================

// // // ✅ YAHAN upload.single('image') ADD KARO
// // router.post('/add', protect, restrictTo('super_admin', 'admin', 'manager', 'editor'), upload.single('image'), addProduct);

// // // ✅ YAHAN upload.single('image') ADD KARO
// // router.put('/:id', protect, restrictTo('super_admin', 'admin', 'manager', 'editor'), upload.single('image'), updateProduct);

// // // ✅ Delete mein upload ki zaroorat nahi
// // router.delete('/:id', protect, restrictTo('super_admin', 'admin'), deleteProduct);

// // export default router;

// // backend/routes/productRoutes.js
// import express from 'express';
// import { 
//     getProducts,
//     getProductById,
//     addProduct,
//     updateProduct,
//     deleteProduct
// } from '../controllers/productController.js';
// import { protect, restrictTo } from '../middleware/authMiddleware.js';
// import upload from '../middleware/uploadMiddleware.js';
// import { validateProduct, validateId } from '../middleware/validationMiddleware.js';

// const router = express.Router();

// // =======================
// //   PUBLIC ROUTES
// // =======================
// router.get('/all', getProducts);
// router.get('/:id', validateId, getProductById);

// // =======================
// //   PROTECTED ADMIN ROUTES (RBAC) with Validation
// // =======================

// // ✅ Add Product - with validation
// router.post(
//     '/add', 
//     protect, 
//     restrictTo('super_admin', 'admin', 'manager', 'editor'), 
//     upload.single('image'), 
//     validateProduct,  // ✅ Input validation
//     addProduct
// );

// // ✅ Update Product - with validation
// router.put(
//     '/:id', 
//     protect, 
//     restrictTo('super_admin', 'admin', 'manager', 'editor'), 
//     upload.single('image'), 
//     validateId,        // ✅ ID validation
//     validateProduct,   // ✅ Input validation
//     updateProduct
// );

// // ✅ Delete Product
// router.delete(
//     '/:id', 
//     protect, 
//     restrictTo('super_admin', 'admin'), 
//     validateId,        // ✅ ID validation
//     deleteProduct
// );

// export default router;

// backend/routes/productRoutes.js
import express from 'express';
import { 
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    createProductReview,   // ✅ ADD THIS
    getProductReviews      // ✅ ADD THIS
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { validateProduct, validateId } from '../middleware/validationMiddleware.js';

const router = express.Router();

// =======================
//   PUBLIC ROUTES
// =======================
router.get('/all', getProducts);
router.get('/:id', validateId, getProductById);

// =======================
//   REVIEWS ROUTES (PUBLIC + PROTECTED)
// =======================

// ✅ Get all reviews for a product (Public)
router.get('/:id/reviews', validateId, getProductReviews);

// ✅ Add a review (Protected - User must be logged in)
router.post('/:id/reviews', protect, validateId, createProductReview);

// =======================
//   PROTECTED ADMIN ROUTES (RBAC) with Validation
// =======================

// Add Product
router.post(
    '/add', 
    protect, 
    restrictTo('super_admin', 'admin', 'manager', 'editor'), 
    upload.single('image'), 
    validateProduct,
    addProduct
);

// Update Product
router.put(
    '/:id', 
    protect, 
    restrictTo('super_admin', 'admin', 'manager', 'editor'), 
    upload.single('image'), 
    validateId,
    validateProduct,
    updateProduct
);

// Delete Product
router.delete(
    '/:id', 
    protect, 
    restrictTo('super_admin', 'admin'), 
    validateId,
    deleteProduct
);

export default router;