import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as an HTTP-only cookie
export const generateTokenAndSetCookie = (res, userId) => {
	// Generate JWT token with userId as payload, secret from environment, and 7-day expiration
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d", // Token expiration set to 7 days
	});

	// Set the token as an HTTP-only cookie with security options
	res.cookie("token", token, {
		httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
		secure: process.env.NODE_ENV === "production", // Ensure secure flag is only set in production
		sameSite: "strict", // Strictly limits cookie sharing between sites
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7-day expiration time in milliseconds
	});

	return token; // Return the generated token for possible future use
};
