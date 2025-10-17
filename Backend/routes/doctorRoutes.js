import authMiddleware from "../middleware/authMiddleware.js";
import { doctors } from "../utils/doctors.js";

// GET - list of available doctors (for testing / assigning)
// router.get("/doctors/list", authMiddleware, async (req, res) => {
//   try {
//     res.json(doctors);
//   } catch (error) {
//     console.error("Doctor list fetch error:", error);
//     res.status(500).json({ message: "Failed to fetch doctors" });
//   }
// });
