
import { useEffect, useState, useMemo } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import CasesTable from "./CasesTable";
import TableShimmer from "../../components/ui/TableShimmer";

function FiltersShimmer() {
  return (
    <div className="flex flex-wrap gap-3 mb-6 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      ))}
    </div>
  );
}

export default function Responded() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [search, setSearch] = useState("");

  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/queries", { params: { status: "Responded" } });
      setCases(data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load responded cases.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const handleStatus = async (c, status) => {
    await api.put(`/queries/${c._id}`, { status });
    refresh();
  };

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(cases.map((c) => c.department).filter(Boolean)))],
    [cases]
  );
  const doctors = useMemo(
    () => ["All", ...Array.from(new Set(cases.map((c) => c.assignedDoctorId?.name).filter(Boolean)))],
    [cases]
  );

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesDept = deptFilter === "All" || c.department === deptFilter;
      const matchesDoctor = doctorFilter === "All" || c.assignedDoctorId?.name === doctorFilter;
      const matchesSearch =
        c.patientId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.referenceId?.toLowerCase().includes(search.toLowerCase());
      return matchesDept && matchesDoctor && matchesSearch;
    });
  }, [cases, deptFilter, doctorFilter, search]);

  return (
    <FacilitatorLayout
      title="Responded Cases"
      actions={
        loading ? (
          <FiltersShimmer />
        ) : (
          <div className="flex flex-wrap gap-3 items-center text-gray-900 dark:text-gray-100">
            <Button onClick={refresh}>Refresh</Button>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="border rounded-md px-3 py-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              className="border rounded-md px-3 py-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100"
            >
              {doctors.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search by patient or ref ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        )
      }
    >
      {loading ? (
        <TableShimmer rows={6} />
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 py-5 text-center">{error}</p>
      ) : filteredCases.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 py-5 text-center">
          No responded cases found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <CasesTable cases={filteredCases} onStatus={handleStatus} />
        </div>
      )}
    </FacilitatorLayout>
  );
}
