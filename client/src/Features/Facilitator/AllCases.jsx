// D:\SHAFIMED\client\src\Features\Facilitator\AllCases.jsx
import { useEffect, useState, useMemo } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import CasesTable from "./CasesTable";

export default function AllCases() {
  const [cases, setCases] = useState([]);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("");
  const [ref, setRef] = useState("");

  useEffect(() => {
    const load = async () => {
        const { data } = await api.get("/queries", { params: { q: q || undefined, department: dept || undefined, ref: ref || undefined } });
        setCases(Array.isArray(data) ? data : []);
    };
    load();
  }, [q, dept, ref]);

  const departments = useMemo(() => {
    const s = new Set();
    cases.forEach(c => { if (c.department) s.add(c.department); });
    return Array.from(s);
  }, [cases]);

  const refresh = async () => {
    const { data } = await api.get("/queries", { params: { q, department: dept || undefined } });
    setCases(data || []);
  };

  const handleStatus = async (c, status) => {
    await api.put(`/queries/${c._id}`, { status });
    refresh();
  };

  return (
    <FacilitatorLayout title="All Cases" actions={<Button onClick={refresh}>Refresh</Button>}>
      <Card className="p-4 mb-4">
        <div className="flex gap-3 flex-wrap">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="px-3 py-2 border rounded-lg" />
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Search by Reference ID (exact)" className="px-3 py-2 border rounded-lg" />
        </div>
      </Card>
      <CasesTable cases={cases} onStatus={handleStatus} onView={() => {}} onAssign={() => {}} />
    </FacilitatorLayout>
  );
}