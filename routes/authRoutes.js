import express from 'express';
// Controller se functions import karein
import { 
    register, 
    login, 
    forgotPassword, 
    resetPassword 
} from '../controllers/authController.js';

const router = express.Router();

// 1. Register aur Login Routes
router.post("/register", register);
router.post("/login", login);

// 2. Password Recovery Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;