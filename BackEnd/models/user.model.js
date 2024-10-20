import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure unique email for each user
    },
    password: {
        type: String,
        required: true // Store hashed password
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now // Automatically set the default to current date/time
    },
    isVerified: {
        type: Boolean,
        default: false // User is unverified by default
    },
    resetPasswordToken: String, // Token for password reset
    resetPasswordExpiresAt: Date, // Expiry time for reset token
    verificationToken: String, // Token for email verification
    verificationTokenExpiresAt: Date, // Expiry time for verification token
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the User model
export const User = mongoose.model('User', userSchema);
