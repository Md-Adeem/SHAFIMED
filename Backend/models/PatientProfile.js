import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    location: { type: String },
    medicalHistory: { type: String }, // free text
  },
  { timestamps: true }
);

export default mongoose.model("PatientProfile", patientProfileSchema);
