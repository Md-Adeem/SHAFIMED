import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Fetch all doctors (for facilitator to assign)
router.get("/doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch all users (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Only facilitators can access this
    if (req.user.role !== "facilitator") {
      return res.status(403).json({ message: "Access denied" });
    }
    
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
