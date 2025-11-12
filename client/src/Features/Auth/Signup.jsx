import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Added icons

export default function Signup() {
  const navigate = useNavigate();

  // ✅ States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
        specialization: role === "doctor" ? specialization : "",
      });

      toast.success(response.data.message || "Registration successful ✅");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed ❌";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section - Benefits */}
        <div className="md:w-1/2 bg-gradient-to-br from-teal-600 to-emerald-500 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Join Us?</h2>
          <ul className="space-y-4 text-base font-medium">
            <li className="flex items-start gap-3">
              <span className="text-xl">💼</span> Connect with top international hospitals
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🏨</span> Free 5-day hotel stay post-surgery
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🚖</span> Complimentary airport pickup & drop
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">📞</span> Local SIM card on arrival
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🗣</span> 24/7 interpreter & medical support
            </li>
          </ul>
        </div>

        {/* Right Section - Signup Form */}
        <div className="md:w-1/2 w-full p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-teal-700 text-center mb-4">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Join us as a Patient, Doctor, or Facilitator
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signup As
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="patient">Patient</option>
                {/* Uncomment below if needed */}
                {/* <option value="doctor">Doctor</option> */}
                {/* <option value="facilitator">Facilitator</option> */}
              </select>
            </div>

            {/* Doctor Specialization */}
            {role === "doctor" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cardiology"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center transition shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              className="text-blue-600 font-medium hover:underline ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
