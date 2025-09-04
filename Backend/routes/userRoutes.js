import express from "express";

const router = express.Router();

// Example route (you can expand later)
router.get("/", (req, res) => {
  res.send("User routes working!");
});

export default router;
