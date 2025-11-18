import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import allCountryCodes from "../../utils/allCountryCodes";


const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    country: "",
    city: "",
    description: "",
    countryCode: "",
    customCountry: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Main visible options
  const countries = [
    { name: "UAE", flag: "🇦🇪", code: "+971" },
    { name: "India", flag: "🇮🇳", code: "+91" },
    { name: "USA", flag: "🇺🇸", code: "+1" },
    { name: "UK", flag: "🇬🇧", code: "+44" },
  ];

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Country select logic
    if (name === "country") {
      if (value === "Other") {
        setFormData((prev) => ({
          ...prev,
          country: value,
          countryCode: "",
          customCountry: "",
        }));
      } else {
        const selected = countries.find((c) => c.name === value);
        setFormData((prev) => ({
          ...prev,
          country: value,
          countryCode: selected ? selected.code : "",
          customCountry: "",
        }));
      }
    }

    // Custom country logic
    else if (name === "customCountry") {
      const typedCountry = value.trim();
      const match = Object.keys(allCountryCodes).find(
        (key) => key.toLowerCase() === typedCountry.toLowerCase()
      );
      const code = match ? allCountryCodes[match] : "";

      setFormData((prev) => ({
        ...prev,
        customCountry: typedCountry,
        countryCode: code,
      }));
    }

    // Default fields
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const finalData = {
        ...formData,
        country:
          formData.country === "Other"
            ? formData.customCountry
            : formData.country,
      };

      const res = await api.post("/quotes", finalData);
      console.log(res.data);

      setSuccess("Quote submitted successfully!");
      setFormData({
        name: "",
        age: "",
        mobile: "",
        country: "",
        city: "",
        description: "",
        countryCode: "",
        customCountry: "",
      });
    } catch (err) {
      console.error(err);
      setSuccess("Failed to submit quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle click outside to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl z-10"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-green-800">Get a Quote</h2>
        {success && <p className="mb-3 text-sm text-green-600">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Country */}
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
            <option value="Other">🌍 Other</option>
          </select>

          {/* Custom Country (if Other) */}
          {formData.country === "Other" && (
            <input
              type="text"
              name="customCountry"
              placeholder="Enter your country"
              value={formData.customCountry}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          {/* Phone */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name="countryCode"
              placeholder="Code"
              value={formData.countryCode}
              onChange={handleChange}
              readOnly={formData.country !== "Other"}
              required
              className={`${
                formData.country === "Other" ? "bg-white" : "bg-gray-100"
              } w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe your requirements"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 h-28 resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            {loading ? "Submitting..." : "Submit Quote"}
          </button>

          {/* Optional helper message */}
          {formData.country === "Other" &&
            formData.customCountry &&
            !formData.countryCode && (
              <p className="text-xs text-gray-500">
                No country code found — please enter manually.
              </p>
            )}
        </form>
      </div>
    </div>
  );
};

export default QuoteModal; 