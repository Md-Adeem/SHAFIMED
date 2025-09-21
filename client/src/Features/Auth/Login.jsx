import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { loginSuccess } from "../../store/slices/authSlice";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", { email, password });
      console.log("Login response data:", data); // Debugging line
      dispatch(loginSuccess({ token: data.token, user: data.user }));
       toast.success(t('common.success') + " ✅");
      // <Toast message="Login Successful ✅" />

      if (data.user.role === "facilitator") {
        navigate("/facilitator");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed ❌";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-blue to-blue-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Amenities List */}
       <div className="md:w-1/2 bg-gradient-to-br from-teal-600 to-emerald-500 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">What we Offer?</h2>
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

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 w-full p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-teal-700 mb-2 text-center">{t('navigation.login')}</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Please login to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                {t('auth.email')}
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                {t('auth.password')}
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              {t('auth.login')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {t('auth.dontHaveAccount')}
            <button
              className="text-blue-600 font-medium hover:underline ml-1"
              onClick={() => navigate("/signup")}
            >
              {t('auth.signup')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
