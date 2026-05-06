// // // import express from 'express';
// // // import { createProductReview } from '../controllers/productController.js';
// // // import { 
// // //     addProduct, 
// // //     getProducts, 
// // //     updateProduct, 
// // //     getProductById,
// // //     deleteProduct 
// // // } from '../controllers/productController.js';
// // // import { protect, adminOnly } from '../middleware/authMiddleware.js';
// // // import upload from '../middleware/multer.js'; 

// // // const router = express.Router();

// // // // ✅ Public Routes (Login ki zaroorat nahi)
// // // router.get('/all', getProducts);
// // // router.get('/:id', getProductById);  // YEH LINE SABSE IMPORTANT HAI

// // // // ✅ Admin Only Routes
// // // router.post('/add', protect, adminOnly, upload.single('image'), addProduct); 
// // // router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct); 
// // // router.delete('/:id', protect, adminOnly, deleteProduct);
// // // router.post('/:id/reviews', protect, createProductReview);

// // // export default router;

// // import express from 'express';
// // import { 
// //     addProduct, 
// //     getProducts, 
// //     updateProduct, 
// //     getProductById,
// //     deleteProduct,
// //     createProductReview,
// //     getProductReviews      // ✅ Add this import
// // } from '../controllers/productController.js';
// // import { protect, adminOnly } from '../middleware/authMiddleware.js';
// // import upload from '../middleware/multer.js'; 

// // const router = express.Router();

// // // ✅ Public Routes (Login ki zaroorat nahi)
// // router.get('/all', getProducts);
// // router.get('/:id', getProductById);

// // // ✅ Reviews Routes - Public (GET) and Protected (POST)
// // router.get('/:id/reviews', getProductReviews);        // ✅ ADD THIS LINE
// // router.post('/:id/reviews', protect, createProductReview);

// // // ✅ Admin Only Routes
// // router.post('/add', protect, adminOnly, upload.single('image'), addProduct); 
// // router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct); 
// // router.delete('/:id', protect, adminOnly, deleteProduct);

// // export default router;

// import express from 'express';
// import { 
//     getProducts,
//     getProductById,
//     addProduct,
//     updateProduct,
//     deleteProduct
// } from '../controllers/productController.js';
// import { protect, restrictTo } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // =======================
// //   PUBLIC ROUTES
// // =======================
// router.get('/all', getProducts);
// router.get('/:id', getProductById);

// // =======================
// //   PROTECTED ADMIN ROUTES (RBAC)
// // =======================

// // ✅ Editor+ can add products
// router.post('/add', protect, restrictTo('super_admin', 'admin', 'manager', 'editor'), addProduct);

// // ✅ Editor+ can update products
// router.put('/:id', protect, restrictTo('super_admin', 'admin', 'manager', 'editor'), updateProduct);

// // ✅ Only Super Admin and Admin can delete products
// router.delete('/:id', protect, restrictTo('super_admin', 'admin'), deleteProduct);

// export default router;


// backend/routes/productRoutes.js
import express from 'express';
import { 
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';  // ✅ YEH LINE ADD KARO

const router = express.Router();

// =======================
//   PUBLIC ROUTES
// =======================
router.get('/all', getProducts);
router.get('/:id', getProductById);

// =======================
//   PROTECTED ADMIN ROUTES (RBAC)
// =======================

// ✅ YAHAN upload.single('image') ADD KARO
router.post('/add', protect, restrictTo('super_admin', 'admin', 'manager', 'editor'), upload.single('image'), addProduct);

// ✅ YAHAN upload.single('image') ADD KARO
router.put('/:id', protect, restrictTo('super_admin', 'admin', 'manager', 'editor'), upload.single('image'), updateProduct);

// ✅ Delete mein upload ki zaroorat nahi
router.delete('/:id', protect, restrictTo('super_admin', 'admin'), deleteProduct);

export default router;