import jwt from "jsonwebtoken";

// Middleware to verify JWT token from cookies
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    // Check if token is present in cookies
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if decoding was successful
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        // Attach user ID to the request object for future use
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        // Handle any errors during token verification
        console.log("Error in verifyToken", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
