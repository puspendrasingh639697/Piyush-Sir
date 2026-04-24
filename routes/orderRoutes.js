

// import express from 'express';
// import  createOrder  from '../controllers/orderController.js';
// import { 
//     createOrder, 
//     getMyOrders, 
//     getOrderById, 
//     cancelOrder,
//     getAllOrders,
//     getAdminStats, // Humne getAdminStats ko hi main rakha hai
//     updateOrderStatus,
//     processRefund 
// } from '../controllers/orderController.js';

// import { protect, adminOnly } from '../middleware/authMiddleware.js'; // Check karle middleware mein 'admin' hi naam hai na

// const router = express.Router();

// // =======================
// //   USER ROUTES
// // =======================

// router.post('/place', protect, createOrder);
// router.get('/myorders', protect, getMyOrders);
// router.get('/:id', protect, getOrderById);
// router.put('/:id/cancel', protect, cancelOrder);

// // =======================
// //   ADMIN ROUTES
// // =======================

// // 1. Saare orders dekhna
// router.get('/admin/all', protect, adminOnly, getAllOrders);

// // 2. Dashboard ke stats (Total Sales, Revenue, etc.)
// router.get('/admin/stats', protect, adminOnly, getAdminStats);

// // 3. Order status & Refunds
// router.put('/admin/:id/status', protect, adminOnly, updateOrderStatus);
// router.put('/admin/:id/refund', protect, adminOnly, processRefund);

// // 4. Admin specific order view
// router.get('/admin/order/:id', protect, adminOnly, getOrderById);
// router.route('/new').post(protect, createOrder)

// // Add this route after other routes
// router.put('/:orderId/payment', protect, async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(
//       req.params.orderId,
//       { 
//         isPaid: true, 
//         paidAt: req.body.paidAt || new Date(),
//         paymentId: req.body.paymentId,
//         razorpayOrderId: req.body.razorpayOrderId
//       },
//       { new: true }
//     );
//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;


import express from 'express';
// ✅ Import fix: Sirf ek baar aur sahi tarike se
import { 
    createOrder, 
    getMyOrders, 
    getOrderById, 
    cancelOrder,
    getAllOrders,
    getAdminStats, 
    updateOrderStatus,
    processRefund 
} from '../controllers/orderController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// =======================
//   USER ROUTES (Jo tune frontend mein use kiye hain)
// =======================

router.post('/place', protect, createOrder); // 👈 Tera frontend isse connect hoga
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);
router.post('/new', protect, createOrder); // Backup ke liye '/new' bhi rakha hai

// =======================
//   ADMIN ROUTES
// =======================

router.get('/admin/all', protect, adminOnly, getAllOrders);
router.get('/admin/stats', protect, adminOnly, getAdminStats);
router.put('/admin/:id/status', protect, adminOnly, updateOrderStatus);
router.put('/admin/:id/refund', protect, adminOnly, processRefund);
router.get('/admin/order/:id', protect, adminOnly, getOrderById);

// Payment update route (as it was in your code)
router.put('/:orderId/payment', protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { 
        isPaid: true, 
        paidAt: req.body.paidAt || new Date(),
        paymentId: req.body.paymentId,
        razorpayOrderId: req.body.razorpayOrderId
      },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;