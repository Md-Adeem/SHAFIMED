// client/src/Features/Facilitator/AllCases.jsx
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import CasesTable from "./CasesTable";
import TableShimmer from "../../components/ui/TableShimmer";






function ShimmerLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-shimmer h-32 rounded-lg"></div>
      ))}
    </div>
  );
}




const STATUS_OPTIONS = ["Pending", "Assigned", "In Progress", "Follow Up", "Responded", "Rejected"];
const STATUS_COLORS = {
  Pending: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300",
  Assigned: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300",
  "In Progress": "bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300",
  "Follow Up": "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300",
  Responded: "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300",
  Rejected: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300",
};


export default function AllCases() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");
  const [doctor, setDoctor] = useState("");
  const [ref, setRef] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);
      const [{ data: casesData }, { data: doctorsData }] = await Promise.all([
        api.get("/queries"),
        api.get("/users/doctors"),
      ]);
      setCases(Array.isArray(casesData) ? casesData : []);
      setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
    } catch (err) {
      console.error("Error fetching cases/doctors:", err);
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);




  


  const departments = useMemo(() => {
    const s = new Set();
    cases.forEach((c) => c.department && s.add(c.department));
    return Array.from(s);
  }, [cases]);

  const refresh = async () => {
    try {
      const { data } = await api.get("/queries");
      setCases(data || []);
    } catch (err) {
      console.error("Error refreshing cases:", err);
    }
  };

  const handleStatus = async (c, newStatus) => {
    try {
      await api.put(`/queries/${c._id}`, { status: newStatus });
      refresh();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const dateValue = c.date || c.createdAt || c.updatedAt || c.submittedOn;
      const caseDate = dateValue ? new Date(dateValue) : null;

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);

      return (
        (!q || (c.title?.toLowerCase().includes(q.toLowerCase()) || c.fullName?.toLowerCase().includes(q.toLowerCase()))) &&
        (!dept || c.department === dept) &&
        (!status || c.status === status) &&
        (!doctor || c.assignedDoctorId === doctor || c.assignedDoctorId?._id === doctor) &&
        (!ref || c.referenceId?.includes(ref)) &&
        (!start || !caseDate || caseDate >= start) &&
        (!end || !caseDate || caseDate <= end)
      );
    });
  }, [cases, q, dept, status, doctor, ref, startDate, endDate]);

  return (
    <FacilitatorLayout
      title={t("facilitator.allCases")}
      actions={<Button onClick={refresh}>{t("facilitator.refresh")}</Button>}
    >
  

        {/* KPI Cards */}
{loading ? (
  <ShimmerLoader />
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <Card className="p-4 flex flex-col items-center justify-center bg-teal-100 dark:bg-teal-400/50 text-gray-900 dark:text-gray-100 hover:shadow-lg transition cursor-pointer">
      <div className="text-gray-500 dark:text-gray-200 text-sm">Total Cases</div>
      <div className="text-3xl font-bold">{cases.length}</div>
    </Card>


    <Card className="p-4 flex flex-col items-center justify-center bg-teal-100 dark:bg-indigo-400/50 text-gray-900 dark:text-gray-100 hover:shadow-lg transition cursor-pointer">
      <div className="text-gray-500 dark:text-gray-200 text-sm">Filtered Cases</div>
      <div className="text-3xl font-bold">{filteredCases.length}</div>
    </Card>
    <Card className="p-4 flex flex-col items-center justify-center bg-teal-100 dark:bg-green-400/50 text-gray-900 dark:text-gray-100 hover:shadow-lg transition cursor-pointer">
      <div className="text-gray-500 dark:text-gray-200 text-sm">Date Filtered Cases</div>
      <div className="text-3xl font-bold">
        {startDate || endDate ? filteredCases.length : cases.length}
      </div>
    </Card>
  </div>
)}


      {/* Filters */}
      <Card className="p-4 mb-4 bg-white dark:bg-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by patient or title"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />

          <select value={dept} onChange={(e) => setDept(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All Departments</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">Assigned Doctor</option>
            {doctors.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="Reference ID"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          <Button size="sm" variant="outline" onClick={() => {
            setQ(""); setDept(""); setStatus(""); setDoctor(""); setRef(""); setStartDate(""); setEndDate("");
          }}>Reset Filters</Button>
        </div>
      </Card>

      {/* Cases Table */}
      {/* <CasesTable 
        cases={filteredCases} 
        onStatus={handleStatus} 
        onView={() => {}} 
        onAssign={refresh} 
        statusColors={STATUS_COLORS} 
      /> */}


     {/* Cases Table */}
{loading ? (
  <TableShimmer />
) : (
  <CasesTable
    cases={filteredCases}
    onStatus={handleStatus}
    onView={() => {}}
    onAssign={refresh}
    statusColors={STATUS_COLORS}
  />
)}



    </FacilitatorLayout>
  );
}
