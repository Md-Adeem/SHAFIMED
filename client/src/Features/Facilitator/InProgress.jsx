
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import CasesTable from "./CasesTable";
import TableShimmer from "../../components/ui/TableShimmer";

export default function InProgress() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false); 

  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/queries", { params: { status: "In Progress" } });
      setCases(data || []);
      setFilteredCases(data || []);
    } catch (err) {
      console.error("Error fetching in-progress cases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    let temp = [...cases];
    const s = search.toLowerCase();
    if (s) temp = temp.filter(c => c.title?.toLowerCase().includes(s) || c.patientName?.toLowerCase().includes(s));
    if (department) temp = temp.filter(c => c.department === department);
    if (startDate) temp = temp.filter(c => new Date(c.createdAt) >= new Date(startDate));
    if (endDate) temp = temp.filter(c => new Date(c.createdAt) <= new Date(endDate));
    temp.sort((a, b) => sortOrder === "latest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));
    setFilteredCases(temp);
  }, [search, department, sortOrder, startDate, endDate, cases]);

  const handleStatus = async (c, status) => {
    await api.put(`/queries/${c._id}`, { status });
    refresh();
  };

  return (
    <FacilitatorLayout title={t('facilitator.inProgress')} actions={<Button onClick={refresh}>{t('facilitator.refresh')}</Button>}>
      <div className="flex flex-wrap gap-3 mb-6 text-gray-900 dark:text-gray-100">
        <input
          type="text"
          placeholder="Search by name or title"
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="ENT">ENT</option>
          <option value="General">General</option>
        </select>
        <input type="date" className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <select className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="latest">Sort: Latest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>

      {loading ? (
        <TableShimmer />
      ) : filteredCases.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">No in-progress cases found.</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow">
          <CasesTable cases={filteredCases} onStatus={handleStatus} />
        </div>
      )}
    </FacilitatorLayout>
  );
}
