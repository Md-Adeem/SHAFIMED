
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubmitCase = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    description: "",
    country: "",
    contact: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };





  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("country", formData.country);
    data.append("contact", formData.contact);
    if (file) data.append("attachments", file);

    await axios.post("http://localhost:5000/api/queries", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // 👈 Fix here
      },
    });

    setMessage("✅ Your case has been submitted successfully!");

    // reset form
    setFormData({
      fullName: "",
      title: "",
      description: "",
      country: "",
      contact: "",
    });
    setFile(null);

    setTimeout(() => {
      navigate("/my-cases");
    }, 2000);
  } catch (err) {
    setMessage("❌ " + (err.response?.data?.message || err.message));
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Image */}
        <div className="relative">
          <img
            src="/sub.jpeg"
            alt="Medical Background"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">Submit Your Case</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Problem Title */}
          <div>
            <label className="block text-gray-700 font-semibold">Problem Title</label>
            <input
              type="text"
              name="title"
              placeholder="Briefly describe your health concern"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-gray-700 font-semibold">Detailed Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Write about your health concern in detail..."
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          {/* Upload Reports */}
          <div>
            <label className="block text-gray-700 font-semibold">Upload Reports</label>
            <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition">
              <label className="cursor-pointer flex flex-col items-center">
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 0l-4 4m4-4l4 4m-6 8h8a2 2 0 002-2V6a2 2 0 00-2-2h-3"
                  />
                </svg>
                <span className="text-gray-500 mt-2">
                  {file ? file.name : "Upload your medical reports"}
                </span>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 font-semibold">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-semibold">Contact</label>
            <input
              type="tel"
              name="contact"
              placeholder="Mobile Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? "Submitting..." : "Submit Case"}
          </button>
        </form>

        {/* Success or Error Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmitCase;
