import express from 'express';
import { 
    login, 
    logout, 
    signup, 
    verifyEmail, 
    forgotPassword, 
    resetPassword, 
    checkAuth 
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Route to check user authentication, requires token verification
router.get("/check-auth", verifyToken, checkAuth);

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Route for user logout
router.post("/logout", logout);

// Route to verify user email
router.post("/verify-email", verifyEmail);

// Route to handle forgotten password
router.post("/forgot-password", forgotPassword);

// Route to reset password, expects a token parameter in the URL
router.post("/reset-password/:token", resetPassword);

export default router;
