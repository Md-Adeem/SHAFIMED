import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
        specialization: role === "doctor" ? specialization : undefined,
      });
      toast.success("Signup Successful ✅");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed ❌";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left: Benefits / Features */}
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
              <span className="text-xl">🗣️</span> 24/7 interpreter & medical support
            </li>
          </ul>
        </div>

        {/* Right: Signup Form */}
        <div className="md:w-1/2 w-full p-8 sm:p-12">
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
                <option value="doctor">Doctor</option>
                <option value="facilitator">Facilitator</option>
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              {t('auth.signup')}
            </button>
          </form>

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
