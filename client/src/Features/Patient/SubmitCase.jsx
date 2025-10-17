import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import { Label, Input, Textarea } from "../../components/ui/Input";
import ProfileCompletionBanner from "../../components/ProfileCompletionBanner";
import useProfileCompletion from "../../hooks/useProfileCompletion";

const SubmitCase = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
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

  // Redirect to profile if not complete
  useEffect(() => {
    if (!profileLoading && !isProfileComplete) {
      alert(t('submitCase.completeProfileAlert'));
      navigate("/profile");
    }
  }, [profileLoading, isProfileComplete, navigate, t]);

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
      if (formData.department) data.append("department", formData.department);
      if (formData.preferredTreatmentLocation) data.append("preferredTreatmentLocation", formData.preferredTreatmentLocation);
      if (formData.additionalNotes) data.append("additionalNotes", formData.additionalNotes);
      files.forEach((f) => data.append("attachments", f));

      const res = await api.post("/queries", data, { headers: { "Content-Type": "multipart/form-data" } });
      setMessage(`${t('submitCase.submitSuccess')} ${res.data?.query?.referenceId || "—"}`);
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
      setMessage(`${t('submitCase.submitError')} ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking profile
  if (profileLoading) {
    return (
      <PatientLayout title={t('submitCase.title')}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('submitCase.checkingProfile')}</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Don't render form if profile is not complete
  if (!isProfileComplete) {
    return (
      <PatientLayout title={t('submitCase.title')}>
        <div className="max-w-2xl mx-auto">
          <ProfileCompletionBanner missingFields={missingFields} />
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">{t('submitCase.redirecting')}</p>
            <Button onClick={() => navigate("/profile")}>{t('submitCase.goToProfile')}</Button>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout
      title={t('submitCase.title')}
      actions={<Button onClick={() => navigate("/my-cases")} variant="secondary">{t('myCases.title')}</Button>}
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow border-2 border-gray-400 p-6 space-y-5">
          {/* Information message about profile data usage */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-blue-800">{t('submitCase.profileDataNoticeTitle')}</h3>
                <p className="mt-1 text-sm text-blue-700">
                  {t('submitCase.profileDataNoticeDescription')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <Label>{t('submitCase.fullName')}</Label>
            <Input
              type="text"
              name="fullName"
              placeholder={t('submitCase.fullNamePlaceholder')}
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border-gray-600"
            />
          </div>

          <div>
            <Label>{t('submitCase.problemTitle')}</Label>
            <Input
              type="text"
              name="title"
              placeholder={t('submitCase.problemTitlePlaceholder')}
              value={formData.title}
              onChange={handleChange}
              required
              className="border-gray-600"
            />
          </div>

          <div>
            <Label>{t('submitCase.detailedDescription')}</Label>
            <Textarea
              name="description"
              rows={6}
              placeholder={t('submitCase.descriptionPlaceholder')}
              value={formData.description}
              onChange={handleChange}
              required
              className="border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>{t('submitCase.country')}</Label>
              <Input
                type="text"
                name="country"
                placeholder={t('submitCase.countryPlaceholder')}
                value={formData.country}
                onChange={handleChange}
                required
                className="border-gray-600"
              />
            </div>
            <div>
              <Label>{t('submitCase.contact')}</Label>
              <Input
                type="tel"
                name="contact"
                placeholder={t('submitCase.contactPlaceholder')}
                value={formData.contact}
                onChange={handleChange}
                required
                className="border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>{t('submitCase.preferredTreatmentLocation')}</Label>
              <Input
                type="text"
                name="preferredTreatmentLocation"
                placeholder={t('submitCase.preferredTreatmentLocationPlaceholder')}
                value={formData.preferredTreatmentLocation}
                onChange={handleChange}
                className="border-gray-600"
              />
            </div>
            <div>
              <Label>{t('submitCase.department')}</Label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition "
              >
                <option value="">{t('submitCase.selectDepartment')}</option>
                <option>{t('departments.cardiology')}</option>
                <option>{t('departments.neurology')}</option>
                <option>{t('departments.orthopedics')}</option>
                <option>{t('departments.oncology')}</option>
                <option>{t('departments.gastroenterology')}</option>
                <option>{t('departments.urology')}</option>
                <option>{t('departments.nephrology')}</option>
                <option>{t('departments.pulmonology')}</option>
                <option>{t('departments.dermatology')}</option>
                <option>{t('departments.ent')}</option>
                <option>{t('departments.generalSurgery')}</option>
              </select>
            </div>
          </div>

          <div>
            <Label>{t('submitCase.additionalNotes')}</Label>
            <Textarea
              name="additionalNotes"
              rows={3}
              placeholder={t('submitCase.additionalNotesPlaceholder')}
              value={formData.additionalNotes}
              onChange={handleChange}
              className="border-gray-600"
            />
          </div>

          <div>
            <Label>{t('submitCase.uploadReports')}</Label>
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
              {loading ? t('common.loading') : t('common.submit') + ' ' + t('patient.submitCase').split(' ')[1]}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189 6.97 6.97 0 011.125-.925M12 12.75v-5.25m0 0a6.01 6.01 0 00-1.5-.189 6.972 6.972 0 00-1.125-.925M12 7.5V6.75a.75.75 0 011.5 0v.75m0 0a6.01 6.01 0 011.5.189A6.972 6.972 0 0118 9.75v.75m0 0V12m-6-6v5.25m0 0a6.01 6.01 0 00-1.5.189A6.972 6.972 0 006 9.75v.75m0 0V12" />
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

          {/* Amenities Section - Teal Theme */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-md border border-teal-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-teal-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <div className="text-sm font-bold text-teal-900">What We Provide</div>
            </div>
            <ul className="space-y-2 text-sm text-teal-800">
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>5 days hotel stay after surgery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Airport pickup and drop service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Local SIM card provided</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>24/7 medical assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Interpreter services</span>
              </li>
            </ul>
          </div>

          {/* Need Help Section - Emerald Theme */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-md border border-emerald-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-emerald-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div className="text-sm font-bold text-emerald-900">Need Help?</div>
            </div>
            <p className="text-sm text-emerald-800 mb-3">
              Our expert team can help you compare hospitals and doctors to find the best treatment options.
            </p>
            <Button 
              onClick={() => navigate("/my-cases")} 
              variant="success" 
              className="w-full"
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