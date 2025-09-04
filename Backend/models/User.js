import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor", "facilitator"], required: true },
    specialization: { type: String }, // only for doctors
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
