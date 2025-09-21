import express from "express";
import PatientProfile from "../models/PatientProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Create or Update comprehensive patient profile
router.post("/", authMiddleware, async (req, res) => {
  try {
    const profileData = req.body;
    
    let profile = await PatientProfile.findOne({ userId: req.user.id });

    if (profile) {
      // Update existing profile with comprehensive data
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== undefined) {
          profile[key] = profileData[key];
        }
      });
      await profile.save();
    } else {
      // Create new comprehensive profile
      profile = new PatientProfile({
        userId: req.user.id,
        ...profileData
      });
      await profile.save();
    }

    res.json({ 
      message: "✅ Profile saved successfully", 
      profile,
      completionPercentage: profile.profileStatus.completionPercentage,
      isComplete: profile.profileStatus.isComplete
    });
  } catch (err) {
    console.error('Profile save error:', err);
    res.status(500).json({ message: err.message });
  }
});

// 📌 Get comprehensive profile with completion status
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.json({ 
        profile: null, 
        isComplete: false,
        completionPercentage: 0,
        missingFields: [
          'personalInfo.firstName',
          'personalInfo.lastName', 
          'personalInfo.dateOfBirth',
          'personalInfo.gender',
          'personalInfo.nationality',
          'contactInfo.currentAddress.country',
          'medicalInfo.currentCondition.primaryDiagnosis',
          'emergencyContacts'
        ]
      });
    }
    
    res.json({ 
      profile,
      isComplete: profile.profileStatus.isComplete,
      completionPercentage: profile.profileStatus.completionPercentage,
      verificationStatus: profile.profileStatus.verificationStatus,
      fullName: profile.fullName,
      calculatedAge: profile.calculatedAge
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
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
        completionPercentage: 0,
        missingFields: [
          'personalInfo.firstName',
          'personalInfo.lastName', 
          'personalInfo.dateOfBirth',
          'personalInfo.gender',
          'personalInfo.nationality'
        ]
      });
    }
    
    res.json({ 
      isComplete: profile.profileStatus.isComplete,
      completionPercentage: profile.profileStatus.completionPercentage,
      lastUpdated: profile.profileStatus.lastUpdated,
      verificationStatus: profile.profileStatus.verificationStatus
    });
  } catch (err) {
    console.error('Profile status error:', err);
    res.status(500).json({ message: err.message });
  }
});

// 📌 Update specific profile section
router.patch("/section/:section", authMiddleware, async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;
    
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    // Update specific section
    if (profile[section]) {
      profile[section] = { ...profile[section], ...updateData };
    } else {
      profile[section] = updateData;
    }
    
    await profile.save();
    
    res.json({ 
      message: `${section} updated successfully`,
      profile,
      completionPercentage: profile.profileStatus.completionPercentage
    });
  } catch (err) {
    console.error('Section update error:', err);
    res.status(500).json({ message: err.message });
  }
});

// 📌 Add medical document
router.post("/documents", authMiddleware, async (req, res) => {
  try {
    const { type, title, description, filePath, reportDate, issuingHospital, doctorName } = req.body;
    
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    const newDocument = {
      type,
      title,
      description,
      filePath,
      uploadDate: new Date(),
      reportDate: reportDate ? new Date(reportDate) : undefined,
      issuingHospital,
      doctorName
    };
    
    profile.medicalDocuments.push(newDocument);
    await profile.save();
    
    res.json({ 
      message: "Document added successfully",
      document: newDocument,
      totalDocuments: profile.medicalDocuments.length
    });
  } catch (err) {
    console.error('Document add error:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

