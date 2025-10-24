
import express from 'express';
const router = express.Router();

import authMiddleware from '../middleware/authMiddleware.js';
import authFacilitator from '../middleware/authFacilitator.js';
import User from '../models/User.js';


// get DOCTOR 
router.get('/', authMiddleware, authFacilitator, async (req, res) => {
    try {
        // Fetch all doctors from the database
        const doctors = await User.find({ role: "doctor" });
        res.json({ message: "Doctor List fetched successfully", data: doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// export default router;