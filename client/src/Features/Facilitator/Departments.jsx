// client/src/Features/Facilitator/Departments.jsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const COMMON_DEPARTMENTS = [
  "Cardiology","Neurology","Orthopedics","Oncology","Gastroenterology",
  "Urology","Nephrology","Pulmonology","Dermatology","ENT","General Surgery"
];

export default function Departments() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [dept, setDept] = useState("");
  const [q, setQ] = useState("");
//   const [custom, setCustom] = useState("");

  const load = async () => {
    const { data } = await api.get("/queries", { params: { department: dept || undefined, q: q || undefined } });
    setCases(data || []);
  };

  useEffect(() => { load(); }, [dept, q]);

  const departments = useMemo(() => {
    const s = new Set(COMMON_DEPARTMENTS);
    cases.forEach(c => { if (c.department) s.add(c.department); });
    return Array.from(s).sort();
  }, [cases]);

//   const setCaseDept = async (id, department) => {
//     await api.put(`/queries/${id}`, { department });
//     await load();
//   };

  return (
    <FacilitatorLayout title={t('facilitator.departments')}>
      <Card className="p-4 mb-4">
        <div className="flex gap-3 flex-wrap">
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="">{t('common.search')} {t('facilitator.departments')}</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`${t('common.search')}...`}
            className="px-3 py-2 border rounded-lg w-full sm:w-80"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">{t('facilitator.patient')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('myCases.title')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('submitCase.department')}</th>
                <th className="px-5 py-3 text-left font-semibold">{t('common.created')}</th>
              </tr>
            </thead>
            <tbody>
              {cases.length === 0 ? (
                <tr><td colSpan="4" className="px-5 py-10 text-center text-gray-500">{t('facilitator.noCasesAvailable')}</td></tr>
              ) : cases.map(c => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-5 py-3">{c.fullName || "—"}</td>
                  <td className="px-5 py-3 max-w-md truncate">{c.title}</td>
                  <td className="px-5 py-3">{c.department || "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </FacilitatorLayout>
  );
}