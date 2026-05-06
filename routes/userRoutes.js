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
//     getAllUsers,           // ✅ New - Admin ke liye
//     updateUserRole,        // ✅ New - Role change
//     deleteUser             // ✅ New - Delete user
// } from "../controllers/userController.js";
// import { protect, adminOnly, restrictTo, minRole } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // =======================
// //   PUBLIC ROUTES
// // =======================
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // =======================
// //   USER ROUTES (Logged in users)
// // =======================
// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);

// // Address Routes
// router.get("/address", protect, getAddresses);
// router.post("/address", protect, addAddress);
// router.put("/address/:addressId", protect, updateAddress);
// router.delete("/address/:addressId", protect, deleteAddress);

// // Wishlist Routes
// router.get("/wishlist", protect, getWishlist);
// router.post("/wishlist", protect, toggleWishlist);

// // =======================
// //   ADMIN ROUTES (Role based)
// // =======================

// // ✅ Admin+ can view all users (Admin, Super Admin)
// router.get("/admin/all", protect, minRole('admin'), getAllUsers);

// // ✅ Only Super Admin can change user roles
// router.put("/admin/:id/role", protect, restrictTo('super_admin'), updateUserRole);

// // ✅ Only Super Admin can delete users
// router.delete("/admin/:id", protect, restrictTo('super_admin'), deleteUser);

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
    deleteUser
} from "../controllers/userController.js";
import { protect, adminOnly, restrictTo, minRole } from "../middleware/authMiddleware.js";
import { validateUser, validateId, validateAddress } from "../middleware/validationMiddleware.js";

const router = express.Router();

// =======================
//   PUBLIC ROUTES with Validation
// =======================
router.post("/register", validateUser, registerUser);  // ✅ With validation
router.post("/login", loginUser);

// =======================
//   USER ROUTES (Logged in users)
// =======================
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Address Routes with Validation
router.get("/address", protect, getAddresses);
router.post("/address", protect, validateAddress, addAddress);  // ✅ With validation
router.put("/address/:addressId", protect, validateAddress, updateAddress);  // ✅ With validation
router.delete("/address/:addressId", protect, deleteAddress);

// Wishlist Routes
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, toggleWishlist);

// =======================
//   ADMIN ROUTES (Role based)
// =======================

// ✅ Admin+ can view all users (Admin, Super Admin)
router.get("/admin/all", protect, minRole('admin'), getAllUsers);

// ✅ Only Super Admin can change user roles - with ID validation
router.put("/admin/:id/role", protect, restrictTo('super_admin'), validateId, updateUserRole);

// ✅ Only Super Admin can delete users - with ID validation
router.delete("/admin/:id", protect, restrictTo('super_admin'), validateId, deleteUser);

export default router;