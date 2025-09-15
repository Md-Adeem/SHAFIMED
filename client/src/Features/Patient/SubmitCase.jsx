
import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import { Label, Input, Textarea } from "../../components/ui/Input";
import ProfileCompletionBanner from "../../components/ProfileCompletionBanner";
import useProfileCompletion from "../../hooks/useProfileCompletion";

const SubmitCase = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    description: "",
    country: "",
    contact: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { isComplete: isProfileComplete, missingFields, loading: profileLoading } = useProfileCompletion();

  const navigate = useNavigate();

  // Redirect to profile if not complete
  useEffect(() => {
    if (!profileLoading && !isProfileComplete) {
      alert("Please complete your profile before submitting a case.");
      navigate("/profile");
    }
  }, [profileLoading, isProfileComplete, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []));
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
      files.forEach((f) => data.append("attachments", f));

      await api.post("/queries", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Your case has been submitted successfully!");
      setFormData({ fullName: "", title: "", description: "", country: "", contact: "" });
      setFiles([]);

      setTimeout(() => {
        navigate("/my-cases");
      }, 1500);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking profile
  if (profileLoading) {
    return (
      <PatientLayout title="Submit a case">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking profile status...</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Don't render form if profile is not complete
  if (!isProfileComplete) {
    return (
      <PatientLayout title="Submit a case">
        <div className="max-w-2xl mx-auto">
          <ProfileCompletionBanner missingFields={missingFields} />
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">You will be redirected to complete your profile...</p>
            <Button onClick={() => navigate("/profile")}>Go to Profile</Button>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout
      title="Submit a case"
      actions={<Button onClick={() => navigate("/my-cases")} variant="secondary">My Cases</Button>}
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow border p-6 space-y-5">
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Problem Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Briefly describe your health concern"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Detailed Description</Label>
            <Textarea
              name="description"
              rows={6}
              placeholder="Write about your health concern in detail..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Contact</Label>
              <Input
                type="tel"
                name="contact"
                placeholder="Mobile Number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label>Upload Reports</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4">
              <input
                id="uploader"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="uploader" className="cursor-pointer inline-flex items-center gap-2 text-cyan-700 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 16a1 1 0 0 0 1-1V8.41l1.3 1.3a1 1 0 1 0 1.4-1.42l-3-3a1 1 0 0 0-1.4 0l-3 3A1 1 0 0 0 9.3 9.7L10.59 8.4V15a1 1 0 0 0 1 1Zm-7 3a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h3a1 1 0 1 1 0 2H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3a1 1 0 1 1 0-2h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3Z"/></svg>
                Select files
              </label>
              {files.length > 0 && (
                <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                  {files.map((f) => (
                    <li key={f.name}>{f.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Case"}
            </Button>
          </div>

          {message && (
            <p className={`text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}>
              {message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow border p-5">
            <div className="text-sm font-bold text-gray-900">Tips</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc list-inside">
              <li>Upload clear scans/reports for faster review.</li>
              <li>Use an active contact number.</li>
              <li>Provide concise, accurate details.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow border p-5">
            <div className="text-sm font-bold text-gray-900">Need help?</div>
            <p className="text-sm text-gray-600 mt-2">Our team can help you compare hospitals and doctors.</p>
            <Button onClick={() => navigate("/my-cases")} variant="secondary" className="mt-3 w-full">Contact support</Button>
          </div>
        </div>
      </form>
    </PatientLayout>
  );
};

export default SubmitCase;
