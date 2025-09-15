// import express from "express";

// const router = express.Router();

// // Example route
// router.get("/", (req, res) => {
//   res.send("Query routes working!");
// });

// export default router;



// backend/routes/queryRoutes.js






import express from "express";
import multer from "multer";
import Query from "../models/Query.js";
import PatientProfile from "../models/PatientProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// setup file storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST - Submit case (Protected) - Requires completed profile
router.post("/", authMiddleware, upload.array("attachments", 5), async (req, res) => {
  try {
    // Check if user's profile is complete before allowing case submission
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(400).json({ 
        message: "Please complete your profile before submitting a case",
        requiresProfile: true,
        missingFields: ['age', 'gender', 'location', 'medicalHistory']
      });
    }
    
    // Check if all required fields are filled
    const requiredFields = ['age', 'gender', 'location', 'medicalHistory'];
    const missingFields = requiredFields.filter(field => {
      const value = profile[field];
      return !value || (typeof value === 'string' && value.trim() === '');
    });
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Please complete your profile. Missing: ${missingFields.join(', ')}`,
        requiresProfile: true,
        missingFields
      });
    }
    
    // Profile is complete, proceed with case submission
    const { fullName, title, description, country, contact } = req.body;

    const newQuery = new Query({
      patientId: req.user.id, // 👈 store logged-in patient
      fullName,
      title,
      description,
      country,
      contact,
      attachments: req.files.map((f) => f.path),
    });

    await newQuery.save();
    res.status(201).json({ message: "Case submitted successfully", query: newQuery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit case" });
  }
});

// GET - fetch all cases of logged-in patient
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const queries = await Query.find({ patientId: req.user.id });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - fetch all cases (for facilitators)
router.get("/", async (req, res) => {
  try {
    const queries = await Query.find()
      .populate('patientId', 'name email')
      .populate('assignedDoctorId', 'name email specialization')
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update query (assign doctor, update status, add response)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedDoctorId, response } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (assignedDoctorId) updateData.assignedDoctorId = assignedDoctorId;
    if (response) updateData.response = response;

    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('assignedDoctorId', 'name email specialization');

    if (!updatedQuery) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.json({ message: "Query updated successfully", query: updatedQuery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update query" });
  }
});

export default router;
