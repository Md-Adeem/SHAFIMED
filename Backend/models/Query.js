import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    specialization: { type: String, required: true },
    attachments: [{ type: String }], // file paths
    status: {
      type: String,
      enum: ["Pending", "Assigned", "Responded"],
      default: "Pending",
    },
    assignedDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    response: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Query", querySchema);
