import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must be under 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: {
        values: ["patient", "doctor", "facilitator"],
        message: "{VALUE} is not a valid user role"
      }
    },
    specialization: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          // Specialization should only be set for doctors
          if (this.role === "doctor" && !value) return false;
          if (this.role !== "doctor" && value) return false;
          return true;
        },
        message: function (props) {
          return this.role === "doctor"
            ? "Doctors must have a specialization"
            : "Only doctors can have a specialization";
        }
      }
    }
  },
  {
    timestamps: true,
    strict: true // Ensures only defined fields are saved
  }
);

// Optional: Add pre-save hook to hash passwords if you haven't already
// import bcrypt from "bcrypt";
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

export default mongoose.model("User", userSchema);
