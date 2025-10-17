import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    location: { type: String },
    medicalHistory: { type: String },
    currentMedications: { type: String },
    allergies: { type: String },
    emergencyContact: { type: String },
    emergencyContactRelation: { type: String },
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    height: { type: String },
    weight: { type: String },
    insuranceInfo: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("PatientProfile", patientProfileSchema);