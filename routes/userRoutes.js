

// import express from "express";
// import * as userController from "../controllers/userController.js"; // 👈 Ye wala import try kar
// import { 
//     registerUser,
//     loginUser,
//     getUserProfile, 
//     updateUserProfile, 
//     getAddresses, 
//     addAddress, 
//     updateAddress, 
//     deleteAddress,
//     toggleWishlist, // ✅ Sab sahi se ek hi jagah
//     getWishlist 
// } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router(); 

// // --- DEBUG LOGS ---
// console.log("--- ROUTE DEBUG START ---");
// console.log("protect:", typeof protect);
// console.log("toggleWishlist:", typeof toggleWishlist);
// console.log("getWishlist:", typeof getWishlist);
// console.log("--- ROUTE DEBUG END ---");

// // 1. AUTH ROUTES
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // 2. PROFILE ROUTES
// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);

// // 3. ADDRESS ROUTES
// router.get("/address", protect, getAddresses);
// router.post("/address", protect, addAddress);
// router.put("/address/:addressId", protect, updateAddress);
// router.delete("/address/:addressId", protect, deleteAddress);
// router.get('/wishlist', protect, getWishlist);
// // router.post('/wishlist', protect, userController.toggleWishlist)
// router.post('/wishlist', protect, toggleWishlist);



// export default router;

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
    getAllUsers,           // ✅ New - Admin ke liye
    updateUserRole,        // ✅ New - Role change
    deleteUser             // ✅ New - Delete user
} from "../controllers/userController.js";
import { protect, adminOnly, restrictTo, minRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// =======================
//   PUBLIC ROUTES
// =======================
router.post("/register", registerUser);
router.post("/login", loginUser);

// =======================
//   USER ROUTES (Logged in users)
// =======================
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Address Routes
router.get("/address", protect, getAddresses);
router.post("/address", protect, addAddress);
router.put("/address/:addressId", protect, updateAddress);
router.delete("/address/:addressId", protect, deleteAddress);

// Wishlist Routes
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, toggleWishlist);

// =======================
//   ADMIN ROUTES (Role based)
// =======================

// ✅ Admin+ can view all users (Admin, Super Admin)
router.get("/admin/all", protect, minRole('admin'), getAllUsers);

// ✅ Only Super Admin can change user roles
router.put("/admin/:id/role", protect, restrictTo('super_admin'), updateUserRole);

// ✅ Only Super Admin can delete users
router.delete("/admin/:id", protect, restrictTo('super_admin'), deleteUser);

export default router;