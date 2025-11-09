
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import { Card } from "../../components/ui/Card";
import PatientsShimmer from "../../components/ui/PatientsShimmer";

export default function Patients() {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patients
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/users/patients");
        if (active) setPatients(data || []);
      } catch (err) {
        if (active) {
          console.error("Failed to load patients:", err);
          setError("Failed to load patients. Please try again.");
          setPatients([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  // Filtered patients (memoized)
  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return patients.filter((p) => {
      if (!query) return true;
      const s = `${p.name} ${p.email} ${p.profile?.location || ""}`.toLowerCase();
      return s.includes(query);
    });
  }, [patients, q]);

  return (
    <FacilitatorLayout title={t('facilitator.patients')}>
      {/* Search Bar */}
      <Card className="p-4 mb-4 flex flex-col sm:flex-row gap-3 sm:items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`${t('common.search')}...`}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
        />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} {t('common.of')} {patients.length} {t('facilitator.patients').toLowerCase()}
        </span>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        {loading ? (
          <PatientsShimmer />
        ) : error ? (
          <div className="p-6 text-center text-red-500 dark:text-red-400">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">{t('facilitator.noCasesAvailable')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-900 dark:text-gray-100">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">{t('common.name')}</th>
                  <th className="px-5 py-3 text-left font-semibold">{t('auth.email')}</th>
                  <th className="px-5 py-3 text-left font-semibold">{t('patientProfile.age')}</th>
                  <th className="px-5 py-3 text-left font-semibold">{t('patientProfile.gender')}</th>
                  <th className="px-5 py-3 text-left font-semibold">{t('patientProfile.location')}</th>
                  <th className="px-5 py-3 text-left font-semibold">{t('patientProfile.medicalHistory')}</th>
                  <th className="px-5 py-3 text-left font-semibold">{t('common.joined')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-5 py-3 font-medium">{p.name}</td>
                    <td className="px-5 py-3">{p.email}</td>
                    <td className="px-5 py-3">{p.profile?.age ?? "—"}</td>
                    <td className="px-5 py-3">{p.profile?.gender ?? "—"}</td>
                    <td className="px-5 py-3">{p.profile?.location ?? "—"}</td>
                    <td
                      className="px-5 py-3 max-w-md truncate"
                      title={p.profile?.medicalHistory || ""}
                    >
                      {p.profile?.medicalHistory ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </FacilitatorLayout>
  );
}
