import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      specialization,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

// import OtpRequest from "../models/OtpRequest.js";
// import User from "../models/User.js";


// // SEND OTP 
// const COOLDOWN_PERIOD_MS = 60 * 1000; // 60 seconds

// export const sendOtp = async (req, res) => {
//   const { email, name, password, role, specialization } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Password strength check
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     if (!passwordRegex.test(password)) {
//    return res.status(400).json({
//     message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
//    });
//    }

//     const existingOtpEntry = await OtpRequest.findOne({ email });

//     // Cooldown check
//     if (existingOtpEntry) {
//       const timeSinceLastOtp = Date.now() - new Date(existingOtpEntry.createdAt).getTime();
//       if (timeSinceLastOtp < COOLDOWN_PERIOD_MS) {
//         const secondsLeft = Math.ceil((COOLDOWN_PERIOD_MS - timeSinceLastOtp) / 1000);
//         return res.status(429).json({ message: `Please wait ${secondsLeft}s before requesting a new OTP.` });
//       }
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await OtpRequest.findOneAndUpdate(
//       { email },
//       {
//         $set: {
//           otp,
//           name,
//           password: hashedPassword,
//           role,
//           specialization,
//           createdAt: new Date(),
//         },
//       },
//       { upsert: true, new: true }
//     );

//     // Enhanced transporter configuration for Render deployment
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true, // Use TLS
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//         ciphers: 'SSLv3'
//       },
//       connectionTimeout: 60000, // 60 seconds
//       greetingTimeout: 30000,
//       socketTimeout: 60000
//     });

//     // Try to send email without verification first (to avoid double connection)
//     await transporter.sendMail({
//       from : `"ShaafiMed" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "ShaafiMed Signup OTP",
//       text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
//     });

//     res.status(200).json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("Send OTP error:", error);
    
//     // More detailed error message
//     if (error.code === 'EAUTH') {
//       res.status(500).json({ 
//         message: "Email authentication failed. Please check your email credentials.",
//         error: error.message,
//         code: 'EAUTH'
//       });
//     } else if (error.code === 'ECONNREFUSED') {
//       res.status(500).json({ 
//         message: "Unable to connect to email server. Please check your network connection.",
//         error: error.message,
//         code: 'ECONNREFUSED'
//       });
//     } else if (error.code === 'ETIMEDOUT') {
//       res.status(500).json({ 
//         message: "Email connection timed out. This might be due to network restrictions in the deployment environment.",
//         error: error.message,
//         code: 'ETIMEDOUT'
//       });
//     } else if (error.response && error.response.includes('535')) {
//       res.status(500).json({ 
//         message: "Gmail authentication failed. Please ensure you're using an App Password, not your regular Gmail password.",
//         error: error.message,
//         code: 'GMAIL_AUTH'
//       });
//     } else if (error.message.includes('Gmail')) {
//       res.status(500).json({ 
//         message: "Gmail service error. This might be due to Gmail security settings or network restrictions.",
//         error: error.message,
//         code: 'GMAIL_ERROR'
//       });
//     } else {
//       res.status(500).json({ 
//         message: `Error sending OTP: ${error.message}`,
//         error: error.message,
//         code: 'UNKNOWN_ERROR'
//       });
//     }
//   }
// };

// // VERIFY OTP & REGISTER
// export const verifyOtpAndRegister = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const otpEntry = await OtpRequest.findOne({ email });
//     if (!otpEntry || otpEntry.otp !== otp) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     const OTP_VALIDITY_DURATION = 10 * 60 * 1000; // 10 minutes
//     const timeElapsed = Date.now() - new Date(otpEntry.createdAt).getTime();
//     if (timeElapsed > OTP_VALIDITY_DURATION) {
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     const { name, password, role, specialization } = otpEntry;

//     const newUser = new User({
//       name,
//       email,
//       password,
//       role,
//       specialization,
//     });

//     await newUser.save();

//     // Enhanced transporter configuration for Render deployment
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true, // Use TLS
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//         ciphers: 'SSLv3'
//       },
//       connectionTimeout: 60000, // 60 seconds
//       greetingTimeout: 30000,
//       socketTimeout: 60000
//     });

//     // Send confirmation email
//     try {
//       // Try to send email without verification first (to avoid double connection)
//       await transporter.sendMail({
//         from: `"ShaafiMed" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Welcome to ShaafiMed 🎉",
//         text: `Hi ${name},

// Your registration was successful! We're excited to have you on board.

// Thank you for joining ShaafiMed. 💙

// Best regards,
// ShaafiMed Team`,
//       });
//     } catch (emailError) {
//       console.error("Welcome email failed:", emailError);
//       // Don't fail registration if welcome email fails
//     }

//     const token = jwt.sign(
//       { id: newUser._id, role: newUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     await OtpRequest.deleteOne({ email });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//       token,
//     });
//   } catch (error) {
//     console.error("Verify OTP error:", error);
    
//     // More detailed error message
//     if (error.code === 'EAUTH') {
//       res.status(500).json({ 
//         message: "Email authentication failed during registration.",
//         error: error.message,
//         code: 'EAUTH'
//       });
//     } else if (error.code === 'ECONNREFUSED') {
//       res.status(500).json({ 
//         message: "Unable to send welcome email. Please check network connection.",
//         error: error.message,
//         code: 'ECONNREFUSED'
//       });
//     } else if (error.code === 'ETIMEDOUT') {
//       res.status(500).json({ 
//         message: "Email connection timed out during registration.",
//         error: error.message,
//         code: 'ETIMEDOUT'
//       });
//     } else if (error.response && error.response.includes('535')) {
//       res.status(500).json({ 
//         message: "Gmail authentication failed. Please ensure you're using an App Password.",
//         error: error.message,
//         code: 'GMAIL_AUTH'
//       });
//     } else {
//       res.status(500).json({ 
//         message: `OTP verification failed: ${error.message}`,
//         error: error.message,
//         code: 'UNKNOWN_ERROR'
//       });
//     }
//   }
// };

// // LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ token, user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
