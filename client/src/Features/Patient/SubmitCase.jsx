import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import { Label, Input, Textarea } from "../../components/ui/Input";
import ProfileCompletionBanner from "../../components/ProfileCompletionBanner";
import useProfileCompletion from "../../hooks/useProfileCompletion";
import SubmitCaseShimmer from "../../components/ui/SubmitCaseShimmer";

const SubmitCase = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    fullName: user.name || "",
    title: user.problemTitle || "",
    description: "",
    country: "",
    contact: "",
    department: "",
    preferredTreatmentLocation: "",
    additionalNotes: ""
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { isComplete: isProfileComplete, missingFields, loading: profileLoading } = useProfileCompletion();

  const navigate = useNavigate();

  // Redirect if profile incomplete
  useEffect(() => {
    if (!profileLoading && !isProfileComplete) {
      alert("Please complete your profile before submitting a case.");
      navigate("/profile");
    }
  }, [profileLoading, isProfileComplete, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      if (formData.department) data.append("department", formData.department);
      if (formData.preferredTreatmentLocation) data.append("preferredTreatmentLocation", formData.preferredTreatmentLocation);
      if (formData.additionalNotes) data.append("additionalNotes", formData.additionalNotes);
      files.forEach((f) => data.append("attachments", f));

      const res = await api.post("/queries", data, { headers: { "Content-Type": "multipart/form-data" } });
      setMessage(`Case submitted successfully! Reference: ${res.data?.query?.referenceId || "—"}`);
      setFormData({ 
        fullName: "", 
        title: "", 
        description: "", 
        country: "", 
        contact: "",
        department: "",
        preferredTreatmentLocation: "",
        additionalNotes: ""
      });
      setFiles([]);

      setTimeout(() => {
        navigate("/my-cases");
      }, 1500);
    } catch (err) {
      setMessage(`Failed to submit case: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // if (profileLoading) {
  //   return (
  //     <PatientLayout title="Submit Case">
  //       <div className="flex items-center justify-center py-12">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto mb-4"></div>
  //           <p className="text-gray-600">Checking profile...</p>
  //         </div>
  //       </div>
  //     </PatientLayout>
  //   );
  // }


  if (profileLoading) {
  return (
    <PatientLayout title="Submit Case">
      <SubmitCaseShimmer />
    </PatientLayout>
  );
}


  if (!isProfileComplete) {
    return (
      <PatientLayout title="Submit Case">
        <div className="max-w-2xl mx-auto">
          <ProfileCompletionBanner missingFields={missingFields} />
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Redirecting to profile...</p>
            <Button onClick={() => navigate("/profile")}>Go to Profile</Button>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout
      title="Submit Case"
      actions={<Button onClick={() => navigate("/my-cases")} variant="secondary">My Cases</Button>}
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <div className="lg:col-span-2 bg-white rounded-xl shadow border-2 border-gray-400 p-6 space-y-5"> */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 
          rounded-xl shadow border-2 border-gray-400 dark:border-gray-600 
          p-6 space-y-5">


          {/* Info Banner */}
          {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"> */}
          <div className="bg-blue-50 dark:bg-blue-900/20 
            border border-blue-200 dark:border-blue-600 
            rounded-lg p-4">

            <div className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-blue-800">Profile Information</h3>
                <p className="mt-1 text-sm text-blue-700">
                  Some fields are automatically filled using your profile details.
                </p>
              </div>
            </div>
          </div>

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
              placeholder="Enter your problem title"
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
              placeholder="Describe your medical issue"
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
              <Label>Contact Number</Label>
              <Input
                type="tel"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Preferred Treatment Location</Label>
              <Input
                type="text"
                name="preferredTreatmentLocation"
                placeholder="Optional"
                value={formData.preferredTreatmentLocation}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Department</Label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                // className="w-full px-4 py-2 border rounded-lg"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              >
                <option value="">Select department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Oncology</option>
                <option>Gastroenterology</option>
                <option>Urology</option>
                <option>Nephrology</option>
                <option>Pulmonology</option>
                <option>Dermatology</option>
                <option>ENT</option>
                <option>General Surgery</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea
              name="additionalNotes"
              rows={3}
              placeholder="Any additional notes (optional)"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
          </div>

          {/* Upload Section */}
          <div>
            <Label>Upload Medical Reports</Label>
            {/* <div className="mt-2 border-2 border-dashed rounded-xl p-4"> */}
            <div className="mt-2 border-2 border-dashed rounded-xl p-4 dark:border-gray-600 dark:bg-gray-800">
              <button
                type="button"
                onClick={() => {
                  const phoneNumber = "+919125549747"; 
                  const userName = user?.name || "Patient";
                  const message = encodeURIComponent(
                    `Hello! I'm ${userName} from ShafiMed platform. I need assistance with uploading medical reports for my case.`
                  );
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full text-left flex items-center gap-2 text-cyan-700 font-semibold"
              >
                Get help uploading reports via WhatsApp
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Click to chat with our facilitator for assistance
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Case"}
            </Button>
          </div>

          {message && (
            <p className={`text-center text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>

        {/* Right Sidebar Sections (no change needed) */}
        <div className="space-y-4">

          {/* Tips Section */}
          {/* <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow p-5"> */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 
          dark:from-orange-900/20 dark:to-orange-800/20  
          rounded-xl shadow p-5 dark:text-orange-200"> 

            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-orange-500 rounded-lg"></div>
              <div className="text-sm font-bold text-orange-900">Helpful Tips</div>
            </div>
            <ul className="space-y-2 text-sm text-orange-800">
              <li>• Upload clear scan documents</li>
              <li>• Use an active contact number</li>
              <li>• Provide accurate details</li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow p-5">
            <div className="text-sm font-bold text-teal-900 mb-2">What We Provide</div>
            <ul className="space-y-2 text-sm text-teal-800">
              <li>• 5 days hotel stay after surgery</li>
              <li>• Airport pickup/drop</li>
              <li>• Local SIM card</li>
              <li>• 24/7 medical assistance</li>
              <li>• Interpreter service</li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow p-5">
            <div className="text-sm font-bold text-emerald-900 mb-2">Need Help?</div>
            <p className="text-sm text-emerald-800 mb-3">
              Our team can help you compare hospitals and doctors.
            </p>
            <Button onClick={() => navigate("/my-cases")} variant="success" className="w-full">
              Contact Support
            </Button>
          </div>

        </div>
      </form>
    </PatientLayout>
  );
};

export default SubmitCase;
