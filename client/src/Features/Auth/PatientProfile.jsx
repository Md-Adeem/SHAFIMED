import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import { Label, Input, Textarea } from "../../components/ui/Input";

const PatientProfile = () => {
  const { t } = useTranslation();

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
      setMessage(t('patientProfile.saveSuccess'));

      // ✅ Re-fetch updated data immediately
      const res = await api.get("/profile");
      if (res.data?.profile) setFormData(res.data.profile);
    } catch (err) {
      console.error("❌ Error saving profile:", err);
      setMessage(t('patientProfile.saveError'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PatientLayout title={t('patientProfile.title')}>
        <div className="text-center py-10 text-gray-500">{t('loading')}...</div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout title={t('patientProfile.title')}>
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>{t('patientProfile.age')}</Label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder={t('patientProfile.agePlaceholder')}
              />
            </div>

            <div>
              <Label>{t('patientProfile.gender')}</Label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
              >
                <option value="">{t('patientProfile.selectGender')}</option>
                <option value="Male">{t('patientProfile.male')}</option>
                <option value="Female">{t('patientProfile.female')}</option>
                <option value="Other">{t('patientProfile.other')}</option>
              </select>
            </div>
          </div>

          <div>
            <Label>{t('patientProfile.location')}</Label>
            <Input
              type="text"
              name="location"
              placeholder={t('patientProfile.locationPlaceholder')}
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>{t('patientProfile.height')}</Label>
              <Input
                type="text"
                name="height"
                placeholder={t('patientProfile.heightPlaceholder')}
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>{t('patientProfile.weight')}</Label>
              <Input
                type="text"
                name="weight"
                placeholder={t('patientProfile.weightPlaceholder')}
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label>{t('patientProfile.bloodGroup')}</Label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            >
              <option value="">{t('patientProfile.selectBloodGroup')}</option>
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
            <Label>{t('patientProfile.medicalHistory')}</Label>
            <Textarea
              name="medicalHistory"
              rows={4}
              placeholder={t('patientProfile.medicalHistoryPlaceholder')}
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>{t('patientProfile.currentMedications')}</Label>
              <Input
                type="text"
                name="currentMedications"
                placeholder={t('patientProfile.currentMedicationsPlaceholder')}
                value={formData.currentMedications}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>{t('patientProfile.allergies')}</Label>
              <Input
                type="text"
                name="allergies"
                placeholder={t('patientProfile.allergiesPlaceholder')}
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>{t('patientProfile.emergencyContact')}</Label>
              <Input
                type="tel"
                name="emergencyContact"
                placeholder={t('patientProfile.emergencyContactPlaceholder')}
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>{t('patientProfile.emergencyContactRelation')}</Label>
              <Input
                type="text"
                name="emergencyContactRelation"
                placeholder={t('patientProfile.emergencyContactRelationPlaceholder')}
                value={formData.emergencyContactRelation}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label>{t('patientProfile.insuranceInfo')}</Label>
            <Input
              type="text"
              name="insuranceInfo"
              placeholder={t('patientProfile.insuranceInfoPlaceholder')}
              value={formData.insuranceInfo}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={saving} className="w-full">
              {saving ? t('saving') + "..." : t('patientProfile.saveProfile')}
            </Button>
          </div>

          {message && <p className="text-center text-sm text-gray-600">{message}</p>}
        </form>
      </div>
    </PatientLayout>
  );
};

export default PatientProfile;
