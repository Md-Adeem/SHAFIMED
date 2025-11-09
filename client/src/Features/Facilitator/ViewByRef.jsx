
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function ViewByRef() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("ref") || "";
  const [ref, setRef] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [item, setItem] = useState(null);

  const fetchByRef = async (r) => {
    if (!r) { setItem(null); return; }
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/queries/ref/${encodeURIComponent(r)}`);
      setItem(data || null);
    } catch (e) {
      setItem(null);
      setError(e.response?.data?.message || t('facilitator.caseNotFound'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initial) fetchByRef(initial);
  }, []); // eslint-disable-line

  const onSearch = async () => {
    setSearchParams(ref ? { ref } : {});
    fetchByRef(ref);
  };

  const labelClass = "text-sm text-gray-600 dark:text-gray-400";
  const valueClass = "text-lg font-semibold text-gray-900 dark:text-gray-100";

  return (
    <FacilitatorLayout title={t('facilitator.viewByRef')}>
      {/* Search Card */}
      <Card className="p-6 mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder={`${t('facilitator.enterReferenceId')} (e.g., SHF-20250917-ABCD)`}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full sm:w-96 text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-teal-500"
          />
          <Button onClick={onSearch} disabled={loading} className="px-6 py-3">
            {loading ? t('facilitator.searching') : t('searchBar.search')}
          </Button>
          <Button
            variant="outline"
            onClick={() => { setRef(""); setItem(null); setSearchParams({}); }}
            className="px-6 py-3"
          >
            {t('facilitator.clear')}
          </Button>
        </div>
        {error && <div className="mt-4 text-red-600 dark:text-red-400 text-lg">{error}</div>}
      </Card>

      {/* Case Profile */}
      {item && (
        <div className="space-y-8">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">{t('CaseProfile')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className={labelClass}>Reference</div>
                <div className={`${valueClass} text-indigo-600 dark:text-indigo-400`}>{item.referenceId || "—"}</div>
              </div>
              <div>
                <div className={labelClass}>Status</div>
                <div className={`${valueClass} ${item.status === "Pending" ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"}`}>{item.status || "Pending"}</div>
              </div>
              <div>
                <div className={labelClass}>Title</div>
                <div className={valueClass}>{item.title || "—"}</div>
              </div>
              <div>
                <div className={labelClass}>Created</div>
                <div className={valueClass}>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}</div>
              </div>
              <div>
                <div className={labelClass}>Department</div>
                <div className={valueClass}>{item.department || "—"}</div>
              </div>
              <div>
                <div className={labelClass}>Updated</div>
                <div className={valueClass}>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "—"}</div>
              </div>
              <div>
                <div className={labelClass}>Country</div>
                <div className={valueClass}>{item.country || "—"}</div>
              </div>
              <div>
                <div className={labelClass}>Contact</div>
                <div className={valueClass}>{item.contact || item.patientId?.contact || "—"}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className={labelClass}>Detailed Description</div>
              <div className="text-lg font-medium text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {item.description || "—"}
              </div>
            </div>
            <div className="mt-4">
              <div className={labelClass}>Additional Notes</div>
              <div className="text-lg font-medium text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {item.additionalNotes || "—"}
              </div>
            </div>
          </Card>

          {/* Patient Profile */}
          {item.patientProfile && (
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">Patient Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div>
                  <div className={labelClass}>Age</div>
                  <div className={valueClass}>{item.patientProfile.age || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Gender</div>
                  <div className={valueClass}>{item.patientProfile.gender || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Blood Group</div>
                  <div className={valueClass}>{item.patientProfile.bloodGroup || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Height</div>
                  <div className={valueClass}>{item.patientProfile.height || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Weight</div>
                  <div className={valueClass}>{item.patientProfile.weight || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Location</div>
                  <div className={valueClass}>{item.patientProfile.location || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Medical History</div>
                  <div className="whitespace-pre-wrap font-medium text-gray-800 dark:text-gray-200">{item.patientProfile.medicalHistory || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Current Medications</div>
                  <div className="whitespace-pre-wrap font-medium text-gray-800 dark:text-gray-200">{item.patientProfile.currentMedications || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Allergies</div>
                  <div className={valueClass}>{item.patientProfile.allergies || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Emergency Contact</div>
                  <div className={valueClass}>{item.patientProfile.emergencyContact} ({item.patientProfile.emergencyContactRelation})</div>
                </div>
                <div>
                  <div className={labelClass}>Insurance Info</div>
                  <div className={valueClass}>{item.patientProfile.insuranceInfo || "—"}</div>
                </div>
                <div>
                  <div className={labelClass}>Preferred Treatment Location</div>
                  <div className={valueClass}>{item.preferredTreatmentLocation || "—"}</div>
                </div>
                <div className="col-span-2">
                  <div className={labelClass}>Patient Email</div>
                  <div className={valueClass}>{item.patientId?.email || "—"}</div>
                </div>
              </div>
            </Card>
          )}

          {/* Assigned Doctor */}
          {item.assignedDoctorId && (
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">Assigned Doctor</h2>
              <div className="text-lg space-y-2 text-gray-900 dark:text-gray-100">
                <div className={valueClass}>{item.assignedDoctorId.name}</div>
                {item.assignedDoctorId.specialization && (
                  <div className={labelClass}>{item.assignedDoctorId.specialization}</div>
                )}
                <div>Email: {item.assignedDoctorId.email || "—"}</div>
                <div>Phone: {item.assignedDoctorId.phone || "—"}</div>
              </div>
            </Card>
          )}

          {/* Attachments */}
          {item.attachments?.length > 0 && (
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className={labelClass + " mb-2"}>Attachments</div>
              <ul className="list-disc list-inside text-lg text-gray-900 dark:text-gray-100">
                {item.attachments.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </Card>
          )}
        </div>
      )}
    </FacilitatorLayout>
  );
}
