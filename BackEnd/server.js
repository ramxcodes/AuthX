import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import path from "path";


// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use port from environment or default to 5000
const __dirname = path.resolve();


app.use(cors ({origin: "http://localhost:5173", credentials: true}))

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Routes for authentication, all under "/api/auth"
app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB(); // Establish connection to MongoDB
    console.log(`Server is running on port ${PORT}`);
});
