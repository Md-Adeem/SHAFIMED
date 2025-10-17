import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [otp, setOtp] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);


  // 1️⃣ Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      await api.post("/auth/send-otp", {
        name,
        email,
        password,
        role,
        specialization: role === "doctor" ? specialization : "",
      });

      toast.success("OTP sent to your email 📩");
      setStep(2);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send OTP ❌";
      toast.error(message);
    }
    finally {
      setLoading(false); // stop loading
    }
  };

  // 2️⃣ Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success("Signup successful ✅");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "OTP verification failed ❌";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-teal-600 to-emerald-500 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Join Us?</h2>
          <ul className="space-y-4 text-base font-medium">
            <li className="flex items-start gap-3"><span className="text-xl">💼</span> Connect with top hospitals</li>
            <li className="flex items-start gap-3"><span className="text-xl">🏨</span> Free 5-day hotel post-surgery</li>
            <li className="flex items-start gap-3"><span className="text-xl">🚖</span> Airport pickup/drop</li>
            <li className="flex items-start gap-3"><span className="text-xl">📞</span> Local SIM card</li>
            <li className="flex items-start gap-3"><span className="text-xl">🗣️</span> 24/7 interpreter support</li>
          </ul>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-teal-700 text-center mb-4">
            {t('auth.createAccount')}
          </h2>

          <h2 className="text-3xl font-bold text-teal-700 text-center mb-4">{t('auth.createAccount')}</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Join us as a Patient, Doctor, or Facilitator</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.firstName')}</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.email')}</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.password')}</label>
              <input
                type="password"
                placeholder="Choose a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Signup As</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="patient">Patient</option>
                {/* <option value="doctor">Doctor</option>
                <option value="facilitator">Facilitator</option> */}
              </select>
            </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.firstName')}
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.email')}</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.password')}</label>
                <input
                  type="password"
                  placeholder="Choose a strong password as Password@123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signup As</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="patient">Patient</option>
                  {/* <option value="doctor">Doctor</option>
                  <option value="facilitator">Facilitator</option> */}
                </select>
              </div>

              {role === "doctor" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g., Cardiology"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              )}

              <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
  disabled={loading}
>
  {loading ? (
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
  ) : null}
  {loading ? "Sending..." : "Send OTP"}
</button>

            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter the 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Verify & Signup
              </button>

              <p
                className="text-sm text-blue-500 text-center cursor-pointer mt-2"
                onClick={() => setStep(1)}
              >
                Edit Info
              </p>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            {t('auth.alreadyHaveAccount')}
            <button
              className="text-blue-600 font-medium hover:underline ml-1"
              onClick={() => navigate("/login")}
            >
              {t('auth.login')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
