import { useEffect, useState, useMemo } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import CasesTable from "./CasesTable";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import dayjs from "dayjs";

export default function PendingCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [dept, setDept] = useState("");
  const [expandedMonths, setExpandedMonths] = useState({});

  // Fetch pending cases
  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/queries", { params: { status: "Pending" } });
      setCases(data || []);
    } catch (err) {
      console.error("Error loading pending cases:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update case status
  const handleStatus = async (c, status) => {
    try {
      setUpdating(c._id);
      const { data: updated } = await api.put(`/queries/${c._id}`, { status });
      if (status !== "Pending") {
        setCases((prev) => prev.filter((x) => x._id !== c._id));
      } else {
        setCases((prev) =>
          prev.map((x) => (x._id === c._id ? { ...x, ...updated } : x))
        );
      }
    } catch (err) {
      console.error("Error updating case:", err);
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  // Create department list
  const departments = useMemo(() => {
    const s = new Set();
    cases.forEach((c) => c.department && s.add(c.department));
    return Array.from(s);
  }, [cases]);

 // Group cases by month
const groupedCases = useMemo(() => {
  const groups = {};

  cases
    .filter((c) => !dept || c.department === dept)
    .forEach((c) => {
      // Parse the case date correctly
      const date = dayjs(c.date, "MM/DD/YYYY, h:mm:ss A");

      // Check if valid
      if (!date.isValid()) {
        if (!groups["Invalid Date"]) groups["Invalid Date"] = [];
        groups["Invalid Date"].push(c);
        return;
      }

      // Create Month-Year key (e.g., "October 2025")
      const monthYear = date.format("MMMM YYYY");

      // Group cases
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(c);
    });

  return groups;
}, [cases, dept]);

  const toggleMonth = (month) => {
    setExpandedMonths((prev) => ({ ...prev, [month]: !prev[month] }));
  };

  return (
  <FacilitatorLayout
    title="Pending Cases"
    actions={
      <div className="flex gap-3 items-center">
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm bg-white"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <Button onClick={refresh} disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Refresh
        </Button>
      </div>
    }
  >
    {loading ? (
      <div className="flex justify-center items-center py-10 text-gray-500">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading cases...
      </div>
    ) : Object.keys(groupedCases).length === 0 ? (
      <div className="text-center py-10 text-gray-500">
        No cases available
      </div>
    ) : (
      // Scrollable container
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {Object.entries(groupedCases)
          .sort(([a], [b]) => new Date(b) - new Date(a))
          .map(([month, monthCases]) => (
            <div
              key={month}
              className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden"
            >
              {/* Header */}
              <div
                className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
                onClick={() => toggleMonth(month)}
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {month}{" "}
                  <span className="text-sm text-gray-500">
                    ({monthCases.length} cases)
                  </span>
                </h3>
                {expandedMonths[month] ? (
                  <ChevronUp className="text-gray-500" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </div>

              {/* Table */}
              {expandedMonths[month] && (
                <div className="p-4 bg-gray-50">
                  <CasesTable
                    cases={monthCases}
                    onStatus={handleStatus}
                    updating={updating}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    )}
  </FacilitatorLayout>
);

}