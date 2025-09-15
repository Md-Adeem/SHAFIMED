
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import doctorImg from "../../assets/_.jpeg";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { name, email, password, role, specialization });
      alert("Signup Successful ✅ Please login.");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed ❌";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#135ec1] to-[#d7e9ff] p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-6">
          <img
            src={doctorImg}
            alt="Doctor"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-6">
            Signup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="facilitator">Facilitator</option>
            </select>

            {role === "doctor" && (
              <input
                type="text"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
