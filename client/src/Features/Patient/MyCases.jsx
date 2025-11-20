
import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import CaseDetailsModal from "./CaseDetailsModal";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import PatientMyCaseShimmer from "../../components/ui/PatientMyCaseShimmer";

function MyCases() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [loadingCases, setLoadingCases] = useState(true); // ⭐ shimmer

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data } = await api.get("/queries/my");
        setCases(data || []);
      } catch (err) {
        setCases([]);
        console.error("Failed to fetch cases:", err);
      } finally {
        setLoadingCases(false);
      }
    };
    fetchCases();
  }, []);



  const filtered = useMemo(() => {
    return cases
      .filter((c) => (tab === "All" ? true : c.status === tab))
    //  .filter((c) => (!q ? true : c.title.toLowerCase().includes(q.toLowerCase())));
      .filter((c) => (!q ? true : ((c.title || "").toLowerCase().includes(q.toLowerCase()) || (c.referenceId || "").toLowerCase().includes(q.toLowerCase()))));
  }, [cases, tab, q]);


    if (loadingCases) {
    return (
      <PatientLayout title="My Cases">
        <PatientMyCaseShimmer />
      </PatientLayout>
    );
  }



  const statusToColor = (s) => (s === "Pending" ? "yellow" : s === "Assigned" ? "blue" : s === "Responded" ? "green" : "red");

  return (
    <PatientLayout
      title="My Cases"
      actions={<Button onClick={() => (window.location.href = "/submit-case")}>Submit Case</Button>}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            {(["All", "Pending", "Assigned", "Responded", "Rejected"]).map((t_val) => (
              <button
                key={t_val}
                onClick={() => setTab(t_val)}
                className={`px-3 py-1.5 rounded-full text-sm ${tab === t_val ? "bg-teal-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                {t_val}
              </button>
            ))}
          </div>
          <div className="ml-auto w-full sm:w-64">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cases..."
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <tr>
               <th className="px-5 py-3 text-left font-semibold">Reference</th>
                <th className="px-5 py-3 text-left font-semibold">Title</th>
                <th className="px-5 py-3 text-left font-semibold">Country</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-left font-semibold">Updated</th>
                <th className="px-5 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-gray-500 dark:text-gray-400">No cases found</td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c._id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                   <td className="px-5 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">{c.referenceId || "—"}</td>
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100">{c.title}</td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{c.country}</td>
                    <td className="px-5 py-3">
                      <Badge color={statusToColor(c.status)}>{c.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{new Date(c.updatedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <Button size="sm" variant="outline" onClick={() => setSelectedCase(c)}>View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCase && (
        <CaseDetailsModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </PatientLayout>
  );
}

export default MyCases;