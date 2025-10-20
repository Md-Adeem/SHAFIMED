// import express from "express";
// import { registerUser, loginUser } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;


import express from "express";
import { sendOtp, verifyOtpAndRegister, loginUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtpAndRegister);
authRouter.post("/login", loginUser);

export default authRouter;


