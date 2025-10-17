import mongoose from "mongoose";

const otpRequestSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  role: { type: String },
  specialization: { type: String },
  createdAt: { type: Date, default: Date.now, index: { expires: 600 } }, // expires in 10 min
});

export default mongoose.model("OtpRequest", otpRequestSchema);
