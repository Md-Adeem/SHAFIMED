import express from "express";
import multer from "multer";
import Query from "../models/Query.js";
import PatientProfile from "../models/PatientProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { doctors } from "../utils/doctors.js";
import User from "../models/User.js";
const router = express.Router();

// Setup file storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/medical-documents/"); // Create this folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// helper role guard
const requireFacilitator = (req, res, next) => {
  if (req.user?.role !== "facilitator") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// helper to generate reference id
const genRefId = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SFM-${y}${m}${day}-${suffix}`;
};

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
    const { 
      fullName, 
      title, 
      description, 
      country, 
      contact, 
      department,
      preferredTreatmentLocation,
      additionalNotes
    } = req.body;

    const newQuery = new Query({
      patientId: req.user.id, // 👈 store logged-in patient
      fullName,
      title,
      description,
      country,
      contact,
      department,
      preferredTreatmentLocation,
      additionalNotes,
      referenceId: genRefId(),
      attachments: (req.files || []).map((f) => f.path),
    });

    await newQuery.save();
    res.status(201).json({ message: "Case submitted successfully", query: newQuery });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit case" });
  }
});

// GET - Fetch all queries of logged-in patient
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const queries = await Query.find({ patientId: req.user.id }).sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    console.error('Patient queries fetch error:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET - fetch all cases (facilitators only) with filtering
router.get("/", authMiddleware, requireFacilitator, async (req, res) => {
  try {
    const { status, department, q, ref } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (ref) filter.referenceId = ref.trim();
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { fullName: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
        { referenceId: { $regex: q, $options: "i" } },
      ];
    }

    const queries = await Query.find(filter)
      .populate('patientId', 'name email')
      .populate('assignedDoctorId', 'name email specialization')
      .sort({ createdAt: -1 });
    
    // Add patient profile information to each query
    const queriesWithProfile = await Promise.all(queries.map(async (query) => {
      const profile = await PatientProfile.findOne({ userId: query.patientId });
      return {
        ...query.toObject(),
        patientProfile: profile || null
      };
    }));
    
    res.json(queriesWithProfile);
  } catch (error) {
    console.error('Single query fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET - fetch single case by reference id (facilitators only)
router.get("/ref/:ref", authMiddleware, requireFacilitator, async (req, res) => {
  try {
    const q = await Query.findOne({ referenceId: req.params.ref })
      .populate('patientId', 'name email')
      .populate('assignedDoctorId', 'name email specialization');
      
    if (!q) return res.status(404).json({ message: "Case not found" });
    
    // Add patient profile information
    const profile = await PatientProfile.findOne({ userId: q.patientId });
    
    res.json({
      ...q.toObject(),
      patientProfile: profile || null
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET - analytics summary (facilitators only)
router.get("/analytics/summary", authMiddleware, requireFacilitator, async (req, res) => {
  try {
    const [byStatus, byDepartment, totals] = await Promise.all([
      Query.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Query.aggregate([
        { $group: { _id: { $ifNull: ["$department", "Unspecified"] }, count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Query.countDocuments()
    ]);
    res.json({ totals, byStatus, byDepartment });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// PUT - Update query (assign doctor, update status, add response) - facilitator only
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedDoctorId, response, department } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (assignedDoctorId) updateData.assignedDoctorId = assignedDoctorId;
    if (response) updateData.response = response;
    if (department !== undefined) updateData.department = department;

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

// GET - list of doctors from DB (role: doctor)
router.get("/doctors/list", authMiddleware, requireFacilitator, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("name email specialization");
    res.json(doctors);
  } catch (error) {
    console.error("Doctor list fetch error:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});


// GET - Running cases (Assigned doctor)
router.get("/running", authMiddleware, async (req, res) => {
  try {
    const runningCases = await Query.find({ assignedDoctorId: { $ne: null }, status: { $nin: ["Responded", "Closed"] } })
      .populate("patientId", "name email")
      .populate("assignedDoctorId", "name email specialization")
      .sort({ updatedAt: -1 });

    res.json(runningCases);
  } catch (error) {
    console.error("Running cases fetch error:", error);
    res.status(500).json({ message: "Failed to fetch running cases" });
  }
});


export default router;