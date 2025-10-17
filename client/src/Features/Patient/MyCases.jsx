
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import CaseDetailsModal from "./CaseDetailsModal";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

function MyCases() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data } = await api.get("/queries/my");
        setCases(data || []);
      } catch (err) {
        setCases([]);
      }
    };
    fetchCases();
  }, []);

  const filtered = useMemo(() => {
    return cases
      .filter((c) => (tab === t('myCases.all') ? true : c.status === tab))
    //  .filter((c) => (!q ? true : c.title.toLowerCase().includes(q.toLowerCase())));
      .filter((c) => (!q ? true : ((c.title || "").toLowerCase().includes(q.toLowerCase()) || (c.referenceId || "").toLowerCase().includes(q.toLowerCase()))));
  }, [cases, tab, q, t]);

  const statusToColor = (s) => (s === t('myCases.pending') ? "yellow" : s === t('myCases.assigned') ? "blue" : s === t('myCases.responded') ? "green" : "red");

  return (
    <PatientLayout
      title={t('myCases.title')}
      actions={<Button onClick={() => (window.location.href = "/submit-case")}>{t('myCases.submitCase')}</Button>}
    >
      <div className="bg-white rounded-xl shadow border">
        <div className="px-5 py-4 border-b flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            {([t('myCases.all'), t('myCases.pending'), t('myCases.assigned'), t('myCases.responded'), t('myCases.rejected')]).map((t_val) => (
              <button
                key={t_val}
                onClick={() => setTab(t_val)}
                className={`px-3 py-1.5 rounded-full text-sm ${tab === t_val ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {t_val}
              </button>
            ))}
          </div>
          <div className="ml-auto w-full sm:w-64">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('myCases.searchPlaceholder')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
            <tr>
               <th className="px-5 py-3 text-left font-semibold">{t('myCases.reference')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('myCases.title')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('myCases.country')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('myCases.status')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('myCases.updated')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('myCases.action')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-gray-500">{t('myCases.noCasesFound')}</td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c._id} className="border-t hover:bg-gray-50">
                   <td className="px-5 py-3 font-mono text-xs">{c.referenceId || "—"}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{c.title}</td>
                    <td className="px-5 py-3">{c.country}</td>
                    <td className="px-5 py-3">
                      <Badge color={statusToColor(c.status)}>{c.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{new Date(c.updatedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <Button size="sm" variant="outline" onClick={() => setSelectedCase(c)}>{t('myCases.view')}</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCase && (
        <CaseDetailsModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </PatientLayout>
  );
}

export default MyCases;
