import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import PatientProfile from "../models/PatientProfile.js";

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


// GET - Patients list with profile (facilitators only)
router.get("/patients", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "facilitator") {
      return res.status(403).json({ message: "Access denied" });
    }
    const patients = await User.find({ role: "patient" }).select("-password");
    const patientIds = patients.map(p => p._id);
    const profiles = await PatientProfile.find({ userId: { $in: patientIds } });

    const profileByUser = new Map(profiles.map(p => [String(p.userId), p]));
    const result = patients.map(p => ({
      _id: p._id,
      name: p.name,
      email: p.email,
      role: p.role,
      createdAt: p.createdAt,
      profile: profileByUser.get(String(p._id)) || null
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
