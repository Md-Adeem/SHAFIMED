import User from "../models/User.js"; // Your User model

const authFacilitator = async (req, res, next) => {
  try {
    // 1️⃣ Make sure authMiddleware already attached user info
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2️⃣ Fetch user from DB to check role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 3️⃣ Check if user is admin/facilitator
    if (user.role !== "facilitator") {
      return res.status(403).json({ message: "Access denied. Facilitators only." });
    }

    // 4️⃣ Attach full user object for downstream routes
    req.user = user;
    next();
  } catch (error) {
    console.error("AuthFacilitator error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default authFacilitator;
