import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

/**
 * CORS CONFIGURATION
 * 
 * Configure Cross-Origin Resource Sharing to allow requests from:
 * - Local development servers (localhost:5173, localhost:5174)
 * - Production frontend (deployed on Vercel/Netlify)
 * 
 * Add your deployed frontend URL here when you deploy
 */
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174",
    "https://shafimed.vercel.app", // Production frontend URL
    "https://shafimed-*.vercel.app" // Allow preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// serve uploads
app.use("/uploads", express.static("uploads"));

/**
 * HEALTH CHECK ENDPOINT
 * 
 * Simple endpoint to check if the server is running
 * Useful for deployment platforms and monitoring
 */
app.get("/", (req, res) => {
  res.json({ 
    message: "🏥 SHAFIMED Backend API is running!", 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Database: ${process.env.MONGO_URI ? 'Connected' : 'Not configured'}`);
  });
});