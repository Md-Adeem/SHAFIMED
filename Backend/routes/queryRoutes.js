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

// POST - Submit case (Protected)
router.post("/", authMiddleware, upload.array("attachments", 5), async (req, res) => {
  try {
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

// (optional) Admin/Doctor can still see all cases
router.get("/", async (req, res) => {
  const queries = await Query.find();
  res.json(queries);
});

export default router;
