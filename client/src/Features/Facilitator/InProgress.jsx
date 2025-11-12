import { useEffect, useState } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import CasesTable from "./CasesTable";
import TableShimmer from "../../components/ui/TableShimmer";


export default function InProgress() {
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


  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    let temp = [...cases];

    // 🔍 Filter by search (name or title)
    if (search.trim()) {
      const s = search.toLowerCase();
      temp = temp.filter(
        (c) =>
          c?.title?.toLowerCase().includes(s) ||
          c?.patientName?.toLowerCase().includes(s)
      );
    }

    // 🏥 Filter by department
    if (department) {
      temp = temp.filter((c) => c?.department === department);
    }

    // 📅 Filter by date range
    if (startDate) {
      temp = temp.filter((c) => new Date(c.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      temp = temp.filter((c) => new Date(c.createdAt) <= new Date(endDate));
    }

    // ⏰ Sort by date
    temp.sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    setFilteredCases(temp);
  }, [search, department, sortOrder, startDate, endDate, cases]);

  const handleStatus = async (c, status) => {
    await api.put(`/queries/${c._id}`, { status });
    refresh();
  };

  return (
    <FacilitatorLayout
      title="In Progress"
      actions={<Button onClick={refresh}>Refresh</Button>}
    >
      {/* 🔧 Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or title"
          className="border rounded px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
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

        <input
          type="date"
          className="border rounded px-3 py-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Sort: Latest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>

      {/* <CasesTable cases={filteredCases} onStatus={handleStatus} /> */}

      {loading ? (
  <TableShimmer />
) : filteredCases.length === 0 ? (
  <div className="text-center py-10 text-gray-500">
    No in-progress cases found.
  </div>
) : (
  <CasesTable cases={filteredCases} onStatus={handleStatus} />
)}

    </FacilitatorLayout>
  );
}