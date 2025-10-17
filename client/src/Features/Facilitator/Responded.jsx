// D:\SHAFIMED\client\src\Features\Facilitator\Responded.jsx
import { useEffect, useState } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import CasesTable from "./CasesTable";


export default function Responded() {
    const [cases, setCases] = useState([]);
    const refresh = async () => {
    const { data } = await api.get("/queries", { params: { status: "Responded" } });
    setCases(data || []);
  };
  useEffect(() => { refresh(); }, []);
  const handleStatus = async (c, status) => { await api.put(`/queries/${c._id}`, { status }); refresh(); };
  return (
    <FacilitatorLayout title="Responded Cases" actions={<Button onClick={refresh}>Refresh</Button>}>
      <CasesTable cases={cases} onStatus={handleStatus} />
    </FacilitatorLayout>
  );
}


