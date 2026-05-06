// import express from 'express';// ✅ Import fix: Sirf ek baar aur sahi tarike se
// import { 
//     createOrder, 
//     getMyOrders, 
//     getOrderById, 
//     cancelOrder,
//     getAllOrders,
//     getAdminStats, 
//     updateOrderStatus,
//     processRefund 
// } from '../controllers/orderController.js';

// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // =======================
// //   USER ROUTES (Jo tune frontend mein use kiye hain)
// // =======================

// router.post('/place', protect, createOrder); // 👈 Tera frontend isse connect hoga
// router.get('/myorders', protect, getMyOrders);
// router.get('/:id', protect, getOrderById);
// router.put('/:id/cancel', protect, cancelOrder);
// router.post('/new', protect, createOrder); // Backup ke liye '/new' bhi rakha hai

// // =======================
// //   ADMIN ROUTES
// // =======================

// router.get('/admin/all', protect, adminOnly, getAllOrders);
// router.get('/admin/stats', protect, adminOnly, getAdminStats);
// router.put('/admin/:id/status', protect, adminOnly, updateOrderStatus);
// router.put('/admin/:id/refund', protect, adminOnly, processRefund);
// router.get('/admin/order/:id', protect, adminOnly, getOrderById);

// // Payment update route (as it was in your code)
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
import { protect, adminOnly, minRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// =======================
//   USER ROUTES
// =======================
router.post('/place', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);
router.post('/new', protect, createOrder);

// =======================
//   ADMIN ROUTES (RBAC - Manager+)
// =======================
router.get('/admin/all', protect, minRole('manager'), getAllOrders);
router.get('/admin/stats', protect, minRole('manager'), getAdminStats);
router.put('/admin/:id/status', protect, minRole('manager'), updateOrderStatus);
router.put('/admin/:id/refund', protect, minRole('manager'), processRefund);
router.get('/admin/order/:id', protect, minRole('manager'), getOrderById);

// Payment update route
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