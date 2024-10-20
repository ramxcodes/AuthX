import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';
import { User } from "../models/user.model.js";

// Signup controller: handles user registration
export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		// Check if all fields are provided
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		// Check if user already exists
		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		// Hash password and generate a verification token
		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		// Create a new user object
		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiry
		});

		// Save user to database
		await user.save();

		// Generate JWT and set cookie
		generateTokenAndSetCookie(res, user._id);

		// Send verification email
		await sendVerificationEmail(user.email, verificationToken);

		// Return success response with user details (excluding password)
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		// Handle errors
		res.status(400).json({ success: false, message: error.message });
	}
};

// Email verification controller
export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		// Find user with the given verification token and ensure it's not expired
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		// If no valid user found, return error
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		// Mark user as verified and remove the token
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		// Send welcome email
		await sendWelcomeEmail(user.email, user.name);

		// Return success response
		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		// Handle errors
		console.log("Error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// Login controller
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Compare entered password with hashed password in DB
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Generate token and set cookie
		generateTokenAndSetCookie(res, user._id);

		// Update last login time
		user.lastLogin = new Date();
		await user.save();

		// Return success response
		res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		// Handle errors
		console.log("Error in login ", error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Logout controller
export const logout = async (req, res) => {
	// Clear the token cookie
	res.clearCookie("token");
	res.status(200).json({
		success: true,
		message: "Logged out successfully",
	});
};

// Forgot password controller
export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		// Find user by email
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token and expiry time
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour expiry

		// Update user with reset token details
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;
		await user.save();

		// Send password reset email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		// Return success response
		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		// Handle errors
		console.log("Error in forgotPassword", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Reset password controller
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// Find user by reset token
		const user = await User.findOne({ resetPasswordToken: token });

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid reset token" });
		}

		// Check if reset token is expired
		if (user.resetPasswordExpiresAt && user.resetPasswordExpiresAt < Date.now()) {
			return res.status(400).json({ success: false, message: "Reset token has expired" });
		}

		// Hash new password and update user
		const hashedPassword = await bcryptjs.hash(password, 10);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		// Send password reset success email
		await sendResetSuccessEmail(user.email);

		// Return success response
		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		// Handle errors
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Authentication check controller
export const checkAuth = async (req, res) => {
	try {
		// Find user by ID and exclude password field
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Return success response
		res.status(200).json({ success: true, user });
	} catch (error) {
		// Handle errors
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
