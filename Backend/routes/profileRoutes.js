// import express from "express";
// import PatientProfile from "../models/PatientProfile.js";
// // import { verifyToken } from "../middleware/authMiddleware.js"; // optional JWT auth middleware
// import authMiddleware from "../middleware/authMiddleware.js";


// const router = express.Router();

// // Create or Update profile
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const { age, gender, location, medicalHistory } = req.body;

//     let profile = await PatientProfile.findOne({ userId: req.user.id });
//     if (profile) {
//       // update
//       profile.age = age;
//       profile.gender = gender;
//       profile.location = location;
//       profile.medicalHistory = medicalHistory;
//       await profile.save();
//     } else {
//       // create
//       profile = new PatientProfile({
//         userId: req.user.id,
//         age,
//         gender,
//         location,
//         medicalHistory,
//       });
//       await profile.save();
//     }

//     res.json({ message: "✅ Profile saved successfully", profile });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get profile
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const profile = await PatientProfile.findOne({ userId: req.user.id });
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;



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

// 📌 Get profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

