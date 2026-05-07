
// import express from "express";
// import { 
//     registerUser,
//     loginUser,
//     getUserProfile, 
//     updateUserProfile, 
//     getAddresses, 
//     addAddress, 
//     updateAddress, 
//     deleteAddress,
//     toggleWishlist,
//     getWishlist,
//     getAllUsers,
//     updateUserRole,
//     deleteUser,
//     // ✅ New Cart & Wishlist Functions
//     moveWishlistToCart,
//     clearCart,
//     getCartWithDetails,
//     getWishlistWithDetails,
//     addToCart,
//     removeFromCart,
//     updateCartQuantity
// } from "../controllers/userController.js";
// import { protect, adminOnly, restrictTo, minRole } from "../middleware/authMiddleware.js";
// import { validateUser, validateId, validateAddress } from "../middleware/validationMiddleware.js";

// const router = express.Router();

// // =======================
// //   PUBLIC ROUTES with Validation
// // =======================
// router.post("/register", validateUser, registerUser);
// router.post("/login", loginUser);

// // =======================
// //   USER PROFILE ROUTES
// // =======================
// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);

// // =======================
// //   ADDRESS ROUTES with Validation
// // =======================
// router.get("/address", protect, getAddresses);
// router.post("/address", protect, validateAddress, addAddress);
// router.put("/address/:addressId", protect, validateAddress, updateAddress);
// router.delete("/address/:addressId", protect, deleteAddress);

// // =======================
// //   CART ROUTES (Enhanced)
// // =======================
// router.get("/cart", protect, getCartWithDetails);
// router.post("/cart/add", protect, addToCart);
// router.put("/cart/update", protect, updateCartQuantity);
// router.delete("/cart/remove/:productId", protect, removeFromCart);
// router.delete("/cart/clear", protect, clearCart);

// // =======================
// //   WISHLIST ROUTES (Enhanced)
// // =======================
// router.get("/wishlist", protect, getWishlistWithDetails);
// router.post("/wishlist/toggle", protect, toggleWishlist);
// router.post("/wishlist/move-to-cart", protect, moveWishlistToCart);

// // =======================
// //   ADMIN ROUTES (Role based)
// // =======================

// // ✅ Admin+ can view all users (Admin, Super Admin)
// router.get("/admin/all", protect, minRole('admin'), getAllUsers);

// // ✅ Only Super Admin can change user roles - with ID validation
// router.put("/admin/:id/role", protect, restrictTo('super_admin'), validateId, updateUserRole);

// // ✅ Only Super Admin can delete users - with ID validation
// router.delete("/admin/:id", protect, restrictTo('super_admin'), validateId, deleteUser);

// export default router;

// backend/routes/userRoutes.js
import express from "express";
import { 
    registerUser,
    loginUser,
    getUserProfile, 
    updateUserProfile, 
    getAddresses, 
    addAddress, 
    updateAddress, 
    deleteAddress,
    toggleWishlist,
    getWishlist,
    getAllUsers,
    updateUserRole,
    deleteUser,
    moveWishlistToCart,
    clearCart,
    getCartWithDetails,
    getWishlistWithDetails,
    addToCart,
    removeFromCart,
    updateCartQuantity
} from "../controllers/userController.js";
import { protect, adminOnly, restrictTo, minRole } from "../middleware/authMiddleware.js";
import { validateUser, validateId, validateAddress } from "../middleware/validationMiddleware.js";

const router = express.Router();

// =======================
//   PUBLIC ROUTES
// =======================
router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);

// =======================
//   USER PROFILE ROUTES
// =======================
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// =======================
//   ADDRESS ROUTES
// =======================
router.get("/address", protect, getAddresses);
router.post("/address", protect, validateAddress, addAddress);
router.put("/address/:addressId", protect, validateAddress, updateAddress);
router.delete("/address/:addressId", protect, deleteAddress);

// =======================
//   CART ROUTES
// =======================
router.get("/cart", protect, getCartWithDetails);
router.post("/cart/add", protect, addToCart);
router.put("/cart/update", protect, updateCartQuantity);
router.delete("/cart/remove/:productId", protect, removeFromCart);
router.delete("/cart/clear", protect, clearCart);

// =======================
//   ✅ WISHLIST ROUTES - YAHAN ADD KARO
// =======================
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist/toggle", protect, toggleWishlist);
router.post("/wishlist/move-to-cart", protect, moveWishlistToCart);

console.log("✅ Wishlist routes registered:");
console.log("   GET /wishlist");
console.log("   POST /wishlist/toggle");

// =======================
//   ADMIN ROUTES
// =======================
router.get("/admin/all", protect, minRole('admin'), getAllUsers);
router.put("/admin/:id/role", protect, restrictTo('super_admin'), validateId, updateUserRole);
router.delete("/admin/:id", protect, restrictTo('super_admin'), validateId, deleteUser);

export default router;