// D:\SHAFIMED\client\src\Features\Facilitator\InProgress.jsx
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import CasesTable from "./CasesTable";

export default function InProgress() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const refresh = async () => {
    const { data } = await api.get("/queries", { params: { status: "In Progress" } });
    setCases(data || []);
  };
  useEffect(() => { refresh(); }, []);
  const handleStatus = async (c, status) => { await api.put(`/queries/${c._id}`, { status }); refresh(); };
  return (
    <FacilitatorLayout title={t('facilitator.inProgress')} actions={<Button onClick={refresh}>{t('facilitator.refresh')}</Button>}>
      <CasesTable cases={cases} onStatus={handleStatus} />
    </FacilitatorLayout>
  );
}