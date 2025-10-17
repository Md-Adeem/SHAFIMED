import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 who submitted
    fullName: { type: String, required: true },        // Patient's full name
    title: { type: String, required: true },           // Problem title
    description: { type: String, required: true },     // Detailed description
    country: { type: String, required: true },         // Country
    contact: { type: String, required: true },         // Contact number
    department: { type: String },                      // e.g., Cardiology, Orthopedics
    preferredTreatmentLocation: { type: String },
    additionalNotes: { type: String },
    attachments: [{ type: String }],  
    referenceId: { type: String, unique: true, index: true }, // SHF-YYYYMMDD-XXXX                 // File paths (reports)
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Follow Up", "Assigned", "Responded", "Rejected"],
      default: "Pending",
    },
    assignedDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    response: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Query", querySchema);