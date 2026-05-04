

import express from "express";
import * as userController from "../controllers/userController.js"; // 👈 Ye wala import try kar
import { 
    registerUser,
    loginUser,
    getUserProfile, 
    updateUserProfile, 
    getAddresses, 
    addAddress, 
    updateAddress, 
    deleteAddress,
    toggleWishlist, // ✅ Sab sahi se ek hi jagah
    getWishlist 
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router(); 

// --- DEBUG LOGS ---
console.log("--- ROUTE DEBUG START ---");
console.log("protect:", typeof protect);
console.log("toggleWishlist:", typeof toggleWishlist);
console.log("getWishlist:", typeof getWishlist);
console.log("--- ROUTE DEBUG END ---");

// 1. AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// 2. PROFILE ROUTES
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// 3. ADDRESS ROUTES
router.get("/address", protect, getAddresses);
router.post("/address", protect, addAddress);
router.put("/address/:addressId", protect, updateAddress);
router.delete("/address/:addressId", protect, deleteAddress);
router.get('/wishlist', protect, getWishlist);
// router.post('/wishlist', protect, userController.toggleWishlist)
router.post('/wishlist', protect, toggleWishlist);



export default router;