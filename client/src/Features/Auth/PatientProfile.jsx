import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    medicalHistory: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch existing profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profile saved successfully!");
    } catch (err) {
      setMessage("❌ Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Complete Your Profile
        </h2>

        {message && <p className="text-center text-sm mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Medical History */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              rows="4"
              placeholder="Write about your past health issues..."
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientProfile;
