// client/src/Features/Facilitator/Analytics.jsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import { Card } from "../../components/ui/Card";

export default function Analytics() {
  const { t } = useTranslation();
  const [data, setData] = useState({ totals: 0, byStatus: [], byDepartment: [] });

  const load = async () => {
    const { data } = await api.get("/queries/analytics/summary");
    setData(data || { totals: 0, byStatus: [], byDepartment: [] });
  };

  useEffect(() => { load(); }, []);

  const statusMap = useMemo(() => Object.fromEntries(data.byStatus.map(s => [s._id, s.count])), [data]);
  const deptMap = useMemo(() => Object.fromEntries(data.byDepartment.map(s => [s._id, s.count])), [data]);

  return (
    <FacilitatorLayout title={t('facilitator.analytics')}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-sm text-gray-600">{t('facilitator.totalCases')}</div>
          <div className="text-3xl font-bold text-gray-900">{data.totals}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">{t('myCases.pending')}</div>
          <div className="text-3xl font-bold text-yellow-600">{statusMap["Pending"] || 0}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">{t('facilitator.inProgress')}</div>
          <div className="text-3xl font-bold text-teal-600">{statusMap["In Progress"] || 0}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="text-lg font-bold mb-3">{t('facilitator.byStatus')}</div>
          <ul className="space-y-2">
            {data.byStatus.map(s => (
              <li key={s._id} className="flex justify-between text-sm">
                <span className="text-gray-700">{s._id}</span>
                <span className="font-semibold">{s.count}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <div className="text-lg font-bold mb-3">{t('facilitator.byDepartment')}</div>
          <ul className="space-y-2">
            {data.byDepartment.map(d => (
              <li key={d._id} className="flex justify-between text-sm">
                <span className="text-gray-700">{d._id}</span>
                <span className="font-semibold">{d.count}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </FacilitatorLayout>
  );
}