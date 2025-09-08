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
app.use(cors());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});