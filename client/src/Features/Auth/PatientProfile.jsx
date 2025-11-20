import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import { Label, Input, Textarea } from "../../components/ui/Input";
import PatientProfileShimmer from "../../components/ui/PatientProfileShimmer";

const PatientProfile = () => {

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    emergencyContact: "",
    emergencyContactRelation: "",
    bloodGroup: "",
    height: "",
    weight: "",
    insuranceInfo: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch patient profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        console.log("Fetched profile:", res.data);

        if (res.data?.profile) {
          setFormData({
            age: res.data.profile.age || "",
            gender: res.data.profile.gender || "",
            location: res.data.profile.location || "",
            medicalHistory: res.data.profile.medicalHistory || "",
            currentMedications: res.data.profile.currentMedications || "",
            allergies: res.data.profile.allergies || "",
            emergencyContact: res.data.profile.emergencyContact || "",
            emergencyContactRelation: res.data.profile.emergencyContactRelation || "",
            bloodGroup: res.data.profile.bloodGroup || "",
            height: res.data.profile.height || "",
            weight: res.data.profile.weight || "",
            insuranceInfo: res.data.profile.insuranceInfo || ""
          });
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Save / Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await api.post("/profile", formData);
      setMessage("Profile saved successfully! ✅");

      // ✅ Re-fetch updated data immediately
      const res = await api.get("/profile");
      if (res.data?.profile) setFormData(res.data.profile);
    } catch (err) {
      console.error("❌ Error saving profile:", err);
      setMessage("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
  return (
    <PatientLayout title="My Profile">
      <PatientProfileShimmer />
    </PatientLayout>
  );
}

  return (
    <PatientLayout title="My Profile">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />
            </div>

            <div>
              <Label>Gender</Label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              placeholder="Your location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Height</Label>
              <Input
                type="text"
                name="height"
                placeholder="e.g., 5'10\"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Weight</Label>
              <Input
                type="text"
                name="weight"
                placeholder="e.g., 70 kg"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label>Blood Group</Label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <Label>Medical History</Label>
            <Textarea
              name="medicalHistory"
              rows={4}
              placeholder="Describe your medical history"
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Current Medications</Label>
              <Input
                type="text"
                name="currentMedications"
                placeholder="List current medications"
                value={formData.currentMedications}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Allergies</Label>
              <Input
                type="text"
                name="allergies"
                placeholder="Known allergies"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Emergency Contact</Label>
              <Input
                type="tel"
                name="emergencyContact"
                placeholder="Emergency contact number"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Emergency Contact Relation</Label>
              <Input
                type="text"
                name="emergencyContactRelation"
                placeholder="Relation to emergency contact"
                value={formData.emergencyContactRelation}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label>Insurance Info</Label>
            <Input
              type="text"
              name="insuranceInfo"
              placeholder="Insurance information"
              value={formData.insuranceInfo}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>

          {message && <p className="text-center text-sm text-gray-600 dark:text-gray-300">{message}</p>}
        </form>
      </div>
    </PatientLayout>
  );
};

export default PatientProfile;
