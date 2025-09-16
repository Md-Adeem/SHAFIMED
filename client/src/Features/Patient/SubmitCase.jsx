
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
        <div className="lg:col-span-2 bg-white rounded-xl shadow border-2 border-gray-400 p-6 space-y-5">
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border-gray-600"
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
              className="border-gray-600"
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
              className="border-gray-600"
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
                className="border-gray-600"
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
                className="border-gray-600"
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
          {/* Tips Section - Orange Theme */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md border border-orange-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-orange-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189 6.97 6.97 0 011.125-.925M12 12.75v-5.25m0 0a6.01 6.01 0 00-1.5-.189 6.97 6.97 0 00-1.125-.925M12 7.5V6.75a.75.75 0 011.5 0v.75m0 0a6.01 6.01 0 011.5.189A6.972 6.972 0 0118 9.75v.75m0 0V12m-6-6v5.25m0 0a6.01 6.01 0 00-1.5.189A6.972 6.972 0 006 9.75v.75m0 0V12" />
                </svg>
              </div>
              <div className="text-sm font-bold text-orange-900">Helpful Tips</div>
            </div>
            <ul className="space-y-2 text-sm text-orange-800">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Upload clear scans/reports for faster review</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Use an active contact number</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Provide concise, accurate details</span>
              </li>
            </ul>
          </div>

          {/* Amenities Section - Blue Theme */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border border-blue-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <div className="text-sm font-bold text-blue-900">What We Provide</div>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>5 days hotel stay after surgery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Airport pickup and drop service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Local SIM card provided</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>24/7 medical assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Interpreter services</span>
              </li>
            </ul>
          </div>

          {/* Need Help Section - Green Theme */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border border-green-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-green-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div className="text-sm font-bold text-green-900">Need Help?</div>
            </div>
            <p className="text-sm text-green-800 mb-3">
              Our expert team can help you compare hospitals and doctors to find the best treatment options.
            </p>
            <Button 
              onClick={() => navigate("/my-cases")} 
              variant="secondary" 
              className="w-full bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 transition-colors"
            >
              Contact Support
            </Button>
          </div>
        </div>

      </form>
    </PatientLayout>
  );
};

export default SubmitCase;
