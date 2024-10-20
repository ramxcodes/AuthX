import mongoose from 'mongoose';

// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        // Attempt to connect using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // Log the host of the successful MongoDB connection
        console.log(`MongoDB is Connected: ${conn.connection.host}`);
        
    } catch (error) {
        // Log the error message if the connection fails
        console.log("Error connecting to MongoDB: ", error.message);
        
        // Exit the process with a failure code
        process.exit(1); 
    }
};
