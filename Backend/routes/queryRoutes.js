import express from "express";
import multer from "multer";
import Query from "../models/Query.js";
import PatientProfile from "../models/PatientProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";

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
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image, PDF, and document files are allowed'));
    }
  }
});

// POST - Submit comprehensive medical query (Protected)
router.post("/", authMiddleware, upload.array("documents", 10), async (req, res) => {
  try {
    // Check if user's profile is complete
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    
    if (!profile || !profile.profileStatus.isComplete) {
      return res.status(400).json({ 
        message: "Please complete your patient profile before submitting a medical query",
        requiresProfile: true,
        completionPercentage: profile?.profileStatus?.completionPercentage || 0
      });
    }
    
    const queryData = {
      ...req.body,
      patientId: req.user.id,
      patientProfileId: profile._id
    };
    
    // Process uploaded documents
    if (req.files && req.files.length > 0) {
      queryData.documents = req.files.map(file => ({
        type: req.body.documentTypes?.[req.files.indexOf(file)] || 'Medical Report',
        title: file.originalname,
        description: req.body.documentDescriptions?.[req.files.indexOf(file)] || '',
        filePath: file.path,
        uploadDate: new Date(),
        fileSize: file.size,
        fileType: file.mimetype,
        isRequired: false,
        verificationStatus: 'Pending'
      }));
    }
    
    // Set initial status
    queryData.status = {
      currentStatus: 'Submitted',
      statusHistory: [{
        status: 'Submitted',
        timestamp: new Date(),
        notes: 'Query submitted by patient'
      }],
      submissionDate: new Date(),
      lastActivityDate: new Date()
    };
    
    // Initialize analytics
    queryData.analytics = {
      viewCount: 0,
      quoteRequestCount: 0,
      source: req.headers['user-agent']?.includes('Mobile') ? 'Mobile App' : 'Website',
      deviceInfo: {
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip
      }
    };

    const newQuery = new Query(queryData);
    await newQuery.save();
    
    // Populate related data for response
    await newQuery.populate('patientId', 'name email phone');
    await newQuery.populate('patientProfileId', 'personalInfo.firstName personalInfo.lastName');
    
    res.status(201).json({ 
      message: "Medical query submitted successfully", 
      query: newQuery,
      queryId: newQuery._id
    });
  } catch (error) {
    console.error('Query submission error:', error);
    res.status(500).json({ message: "Failed to submit medical query", error: error.message });
  }
});

// GET - Fetch all queries of logged-in patient
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, urgency } = req.query;
    
    const filter = { patientId: req.user.id };
    if (status) filter['status.currentStatus'] = status;
    if (urgency) filter['queryInfo.urgency'] = urgency;
    
    const queries = await Query.find(filter)
      .populate('assignment.assignedFacilitatorId', 'name email professional.specialization')
      .populate('assignment.assignedDoctorIds', 'name email professional.specialization')
      .sort({ 'status.lastActivityDate': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Query.countDocuments(filter);
    
    res.json({
      queries,
      totalQueries: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    });
  } catch (err) {
    console.error('Patient queries fetch error:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET - Fetch all queries (for facilitators/admins)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, urgency, specialization, country } = req.query;
    
    const filter = {};
    if (status) filter['status.currentStatus'] = status;
    if (urgency) filter['queryInfo.urgency'] = urgency;
    if (specialization) filter['treatmentPreferences.preferredSpecialization'] = specialization;
    if (country) filter['travelInfo.currentLocation.country'] = country;
    
    const queries = await Query.find(filter)
      .populate('patientId', 'name email phone address.country')
      .populate('patientProfileId', 'personalInfo.firstName personalInfo.lastName personalInfo.age personalInfo.gender')
      .populate('assignment.assignedFacilitatorId', 'name email professional')
      .populate('assignment.assignedDoctorIds', 'name email professional')
      .sort({ 'status.lastActivityDate': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Query.countDocuments(filter);
    
    // Get query statistics
    const stats = await Query.aggregate([
      { $group: {
        _id: '$status.currentStatus',
        count: { $sum: 1 }
      }}
    ]);
    
    res.json({
      queries,
      totalQueries: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      statistics: stats,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('All queries fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch single query by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = await Query.findById(id)
      .populate('patientId', 'name email phone address')
      .populate('patientProfileId')
      .populate('assignment.assignedFacilitatorId', 'name email professional')
      .populate('assignment.assignedDoctorIds', 'name email professional')
      .populate('quotes.hospitalId', 'name address accreditation')
      .populate('quotes.doctorId', 'name professional')
      .populate('quotes.facilitatorId', 'name professional');
    
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }
    
    // Increment view count
    query.analytics.viewCount += 1;
    await query.save();
    
    res.json({ query });
  } catch (error) {
    console.error('Single query fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update query (assign staff, update status, add notes)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedFacilitatorId, assignedDoctorIds, assignedHospitalIds, priority, notes } = req.body;

    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }
    
    // Update assignment
    if (assignedFacilitatorId) query.assignment.assignedFacilitatorId = assignedFacilitatorId;
    if (assignedDoctorIds) query.assignment.assignedDoctorIds = assignedDoctorIds;
    if (assignedHospitalIds) query.assignment.assignedHospitalIds = assignedHospitalIds;
    if (priority) query.assignment.priority = priority;
    
    // Update status
    if (status && status !== query.status.currentStatus) {
      query.status.currentStatus = status;
      query.status.statusHistory.push({
        status,
        timestamp: new Date(),
        updatedBy: req.user.id,
        notes: notes || `Status changed to ${status}`
      });
    }
    
    // Add internal notes
    if (notes) {
      query.internalNotes.push({
        note: notes,
        addedBy: req.user.id,
        timestamp: new Date(),
        category: 'Administrative'
      });
    }
    
    query.status.lastActivityDate = new Date();
    await query.save();
    
    // Populate for response
    await query.populate('assignment.assignedFacilitatorId', 'name email');
    await query.populate('assignment.assignedDoctorIds', 'name email professional.specialization');

    res.json({ 
      message: "Query updated successfully", 
      query
    });
  } catch (error) {
    console.error('Query update error:', error);
    res.status(500).json({ message: "Failed to update query", error: error.message });
  }
});

// POST - Add quote to query
router.post("/:id/quotes", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const quoteData = req.body;
    
    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }
    
    // Add quote with default status
    const newQuote = {
      ...quoteData,
      quoteStatus: {
        status: 'Draft',
        sentDate: null,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    };
    
    query.quotes.push(newQuote);
    query.analytics.quoteRequestCount += 1;
    
    // Update status if this is the first quote
    if (query.quotes.length === 1) {
      query.status.currentStatus = 'Quotes Received';
      query.status.statusHistory.push({
        status: 'Quotes Received',
        timestamp: new Date(),
        updatedBy: req.user.id,
        notes: 'First quote received'
      });
    }
    
    await query.save();
    
    res.json({ 
      message: "Quote added successfully",
      quote: newQuote,
      totalQuotes: query.quotes.length
    });
  } catch (error) {
    console.error('Quote add error:', error);
    res.status(500).json({ message: "Failed to add quote", error: error.message });
  }
});

export default router;
