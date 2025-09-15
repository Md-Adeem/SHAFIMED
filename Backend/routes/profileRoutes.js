import express from "express";
import PatientProfile from "../models/PatientProfile.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ default import

const router = express.Router();

// 📌 Create or Update profile
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { age, gender, location, medicalHistory } = req.body;

    let profile = await PatientProfile.findOne({ userId: req.user.id });

    if (profile) {
      // Update existing
      profile.age = age;
      profile.gender = gender;
      profile.location = location;
      profile.medicalHistory = medicalHistory;
      await profile.save();
    } else {
      // Create new
      profile = new PatientProfile({
        userId: req.user.id,
        age,
        gender,
        location,
        medicalHistory,
      });
      await profile.save();
    }

    res.json({ message: "✅ Profile saved successfully", profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Get profile with completion status
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.json({ 
        profile: null, 
        isComplete: false,
        missingFields: ['age', 'gender', 'location', 'medicalHistory']
      });
    }
    
    // Check if profile is complete (all required fields filled)
    const requiredFields = ['age', 'gender', 'location', 'medicalHistory'];
    const missingFields = requiredFields.filter(field => {
      const value = profile[field];
      return !value || (typeof value === 'string' && value.trim() === '');
    });
    
    const isComplete = missingFields.length === 0;
    
    res.json({ 
      profile, 
      isComplete,
      missingFields: isComplete ? [] : missingFields
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Get profile completion status only
router.get("/status", authMiddleware, async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.json({ 
        isComplete: false,
        missingFields: ['age', 'gender', 'location', 'medicalHistory']
      });
    }
    
    // Check if profile is complete
    const requiredFields = ['age', 'gender', 'location', 'medicalHistory'];
    const missingFields = requiredFields.filter(field => {
      const value = profile[field];
      return !value || (typeof value === 'string' && value.trim() === '');
    });
    
    const isComplete = missingFields.length === 0;
    
    res.json({ 
      isComplete,
      missingFields: isComplete ? [] : missingFields
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

