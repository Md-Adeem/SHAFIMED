import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import { Label, Input, Textarea } from "../../components/ui/Input";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    medicalHistory: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        if (res.data) setFormData({
          age: res.data.age || "",
          gender: res.data.gender || "",
          location: res.data.location || "",
          medicalHistory: res.data.medicalHistory || "",
        });
      } catch (err) {
        // ignore if not found
      } finally {
        setLoading(false);
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
      await api.post("/profile", formData);
      setMessage("✅ Profile saved successfully!");
    } catch (err) {
      setMessage("❌ Failed to save profile");
    }
  };

  return (
    <PatientLayout title="My profile">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border p-6 space-y-6">
          <div>
            <Label>Age</Label>
            <Input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Your age"
            />
          </div>

          <div>
            <Label>Gender</Label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Medical history</Label>
            <Textarea
              name="medicalHistory"
              rows={5}
              placeholder="Write about your past health issues..."
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full">Save profile</Button>
          </div>

          {message && <p className="text-center text-sm">{message}</p>}
        </form>
      </div>
    </PatientLayout>
  );
};

export default PatientProfile;
