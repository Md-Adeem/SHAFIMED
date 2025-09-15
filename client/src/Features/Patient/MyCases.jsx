
import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import CaseDetailsModal from "./CaseDetailsModal";
import PatientLayout from "../../components/layout/PatientLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

function MyCases() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data } = await api.get("/queries/my");
        setCases(data || []);
      } catch (err) {
        setCases([]);
      }
    };
    fetchCases();
  }, []);

  const filtered = useMemo(() => {
    return cases
      .filter((c) => (tab === "All" ? true : c.status === tab))
      .filter((c) => (!q ? true : c.title.toLowerCase().includes(q.toLowerCase())));
  }, [cases, tab, q]);

  const statusToColor = (s) => (s === "Pending" ? "yellow" : s === "Assigned" ? "blue" : s === "Responded" ? "green" : "red");

  return (
    <PatientLayout
      title="My cases"
      actions={<Button onClick={() => (window.location.href = "/submit-case")}>Submit case</Button>}
    >
      <div className="bg-white rounded-xl shadow border">
        <div className="px-5 py-4 border-b flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            {(["All", "Pending", "Assigned", "Responded", "Rejected"]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-full text-sm ${tab === t ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="ml-auto w-full sm:w-64">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
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
                  <td colSpan="5" className="px-5 py-10 text-center text-gray-500">No cases found.</td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c._id} className="border-t hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{c.title}</td>
                    <td className="px-5 py-3">{c.country}</td>
                    <td className="px-5 py-3">
                      <Badge color={statusToColor(c.status)}>{c.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{new Date(c.updatedAt).toLocaleDateString()}</td>
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
