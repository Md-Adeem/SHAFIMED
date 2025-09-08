// import mongoose from "mongoose";

// const querySchema = new mongoose.Schema(
//   {
//     patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     description: { type: String, required: true },
//     specialization: { type: String, required: true },
//     attachments: [{ type: String }], // file paths
//     status: {
//       type: String,
//       enum: ["Pending", "Assigned", "Responded"],
//       default: "Pending",
//     },
//     assignedDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     response: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Query", querySchema);








import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 who submitted
    fullName: { type: String, required: true },        // Patient's full name
    title: { type: String, required: true },           // Problem title
    description: { type: String, required: true },     // Detailed description
    country: { type: String, required: true },         // Country
    contact: { type: String, required: true },         // Contact number
    attachments: [{ type: String }],                   // File paths (reports)
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

