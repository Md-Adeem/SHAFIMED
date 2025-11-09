import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import ProfileCompletionBanner from "../../components/ProfileCompletionBanner";
import useProfileCompletion from "../../hooks/useProfileCompletion";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const { isComplete: isProfileComplete, missingFields, loading: profileLoading } = useProfileCompletion();
  
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const handleSubmitCase = () => {
    if (!isProfileComplete) {
      alert("Please complete your profile before submitting a case.");
      navigate("/profile");
      return;
    }
    navigate("/submit-case");
  };

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data } = await api.get("/queries/my");
        setCases(data || []);
      } catch (err) {
        console.error("Failed to fetch cases:", err);
        setCases([]);
      }
    };
    fetchCases();
  }, []);

  const counts = {
    total: cases.length,
    pending: cases.filter((c) => c.status === "Pending").length,
    assigned: cases.filter((c) => c.status === "Assigned").length,
    Closed: cases.filter((c) => c.status === "Closed").length,
  };

  const latest = cases[0];

  return (
    <PatientLayout
      title={user?.name ? `${t('dashboard.welcome')}, ${user.name}` : t('navigation.dashboard')}
      actions={
        <>
          <Button 
            onClick={handleSubmitCase}
            disabled={!isProfileComplete}
            className={!isProfileComplete ? "opacity-50 cursor-not-allowed" : ""}
          >
            {t('patient.submitCase')}
          </Button>
          <Button onClick={() => navigate("/my-cases")} variant="secondary">{t('patient.myCases')}</Button>
        </>
      }
    >
      {/* Profile Completion Banner */}
      {!profileLoading && !isProfileComplete && (
        <ProfileCompletionBanner 
          missingFields={missingFields} 
          className="mb-6"
        />
      )}
      
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">{t('dashboard.latestCase')}</h2>
            {latest && (
              <span className={`px-3 py-1 rounded-full text-white text-xs ${
                latest.status === "Pending"
                  ? "bg-yellow-500"
                  : latest.status === "Assigned"
                  ? "bg-blue-600"
                  : latest.status === "Closed"
                  ? "bg-green-600"
                  : "bg-gray-500"
              }`}>
                {latest.status}
              </span>
            )}
          </div>
          {!latest ? (
            <div className="text-sm text-gray-600">{t('dashboard.submitFirstCase')}</div>
          ) : (
            <>
              <div className="font-semibold text-gray-900">{latest.title}</div>
              <div className="text-xs text-gray-500 mt-1">{latest.country} • Updated {new Date(latest.updatedAt).toLocaleDateString()}</div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => navigate("/my-cases")}>{t('dashboard.viewCases')}</Button>
                <Button 
                  size="sm" 
                  onClick={handleSubmitCase}
                  disabled={!isProfileComplete}
                  className={!isProfileComplete ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {t('dashboard.submitNew')}
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow border p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">{t('dashboard.statusBreakdown')}</h2>
          {counts.total === 0 ? (
            <div className="text-sm text-gray-600">{t('dashboard.noDataYet')}</div>
          ) : (
            <>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-yellow-500" style={{ width: `${(counts.pending / counts.total) * 100 || 0}%` }} />
                <div className="h-full bg-blue-600" style={{ width: `${(counts.assigned / counts.total) * 100 || 0}%` }} />
                <div className="h-full bg-green-600" style={{ width: `${(counts.Closed / counts.total) * 100 || 0}%` }} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div><span className="inline-block w-2 h-2 bg-yellow-500 rounded-sm mr-2"></span>Pending {counts.pending}</div>
                <div><span className="inline-block w-2 h-2 bg-blue-600 rounded-sm mr-2"></span>In progress {counts.assigned}</div>
                <div><span className="inline-block w-2 h-2 bg-green-600 rounded-sm mr-2"></span>Resolved {counts.Closed}</div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow border p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">{t('dashboard.doNext')}</h2>
          <div className="space-y-3 text-sm">
            <button 
              onClick={() => navigate("/profile")} 
              className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                !isProfileComplete 
                  ? "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100" 
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200"
              }`}
            >
              {!isProfileComplete ? t('dashboard.completeProfileRequired') : t('dashboard.profileCompleted')}
            </button>
            <button 
              onClick={handleSubmitCase}
              disabled={!isProfileComplete}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                !isProfileComplete
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-900 border-gray-200"
              }`}
            >
              {t('dashboard.submitNewCase')}
            </button>
            <button onClick={() => navigate("/my-cases")} className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200">{t('dashboard.checkResponses')}</button>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow border overflow-hidden mt-6">
        <div className="px-5 py-4 border-b"><h2 className="text-lg font-bold text-gray-900">{t('dashboard.recentCases')}</h2></div>
        {cases.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <div className="text-gray-700 font-semibold">{t('dashboard.noCasesYet')}</div>
            <div className="text-gray-500 text-sm mt-1">
              {!isProfileComplete 
                ? t('dashboard.completeProfileFirst')
                : t('dashboard.submitFirstCase')
              }
            </div>
            <Button 
              onClick={handleSubmitCase}
              disabled={!isProfileComplete}
              className={`mt-4 ${!isProfileComplete ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {t('dashboard.submitACase')}
            </Button>
          </div>
        ) : (
          <ul className="divide-y">
            {cases.slice(0, 8).map((c) => (
              <li key={c._id} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{c.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{c.country}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-white text-xs ${
                    c.status === "Pending"
                      ? "bg-yellow-500"
                      : c.status === "Assigned"
                      ? "bg-blue-600"
                      : c.status === "Closed"
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }`}>
                    {c.status}
                  </span>
                  <div className="text-xs text-gray-500">{new Date(c.updatedAt).toLocaleDateString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PatientLayout>
  );
}