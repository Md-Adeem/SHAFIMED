import express from 'express';
const router = express.Router();
import Quote from '../models/Getquote.js';
import authMiddleware from '../middleware/authMiddleware.js';
import authFacilitator from '../middleware/authFacilitator.js';

// GET /api/quotes - Retrieve all quotes  for admin dashboard
router.get('/', authMiddleware, authFacilitator, async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    console.error('Error retrieving quotes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Post /api/quotes - Create a new quote
router.post("/", async (req, res) => {
    try{
        const { name, age, mobile, country, city, description , countryCode } = req.body;

        // Validation 
        if (!name || !age || !mobile || !country || !city || !description || !countryCode) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newQuote = new Quote({
            name,
            age,
            mobile,
            country,
            city,
            description,
            countryCode
        });
        const savedQuote = await newQuote.save();
        res.status(201).json(savedQuote);
    } catch (error) { 
        console.error('Error creating quote:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


export default router;