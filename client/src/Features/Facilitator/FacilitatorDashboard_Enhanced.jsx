
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import TableShimmer from "../../components/ui/DoctorSelectShimmer";

// Possible case statuses
const STATUSES = ["Pending", "Assigned", "In Progress", "Follow Up", "Responded", "Rejected", "Failed"];

export default function FacilitatorDashboard() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [updatingCaseId, setUpdatingCaseId] = useState(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // -------- FETCH DATA --------
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [casesRes, doctorsRes] = await Promise.all([
          api.get("/queries"),
          api.get("/users/doctors"),
        ]);

        setCases(Array.isArray(casesRes.data) ? casesRes.data : []);
        setDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCases([]);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // -------- SYNC STATUS TAB WITH URL PARAM --------
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (!statusParam) return setTab("All");

    const matched = STATUSES.find(
      (s) => s.toLowerCase() === statusParam.toLowerCase()
    );
    setTab(matched || "All");
  }, [searchParams]);

  // -------- RECENT CASES (LATEST 6) --------
  const recentCases = useMemo(() => {
    return [...cases]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [cases]);

  // -------- COMPUTE CASE STATISTICS --------
  const stats = useMemo(() => {
    const count = {
      total: 0,
      pending: 0,
      assigned: 0,
      inprogress: 0,
      followup: 0,
      responded: 0,
      rejected: 0,
      failed: 0, 
      unknown: 0,
    };

    cases.forEach((c) => {
      count.total++;
      const key = (c.status || "unknown").toLowerCase().replace(/\s+/g, "");
      if (key === "failed") count.failed++; // ✅ Counts failed cases
      else if (count[key] !== undefined) count[key]++;
      else count.unknown++;
    });

    return count;
  }, [cases]);

  // -------- UPDATE CASE STATUS --------
  const handleUpdateStatus = useCallback(
    async (caseId, newStatus) => {
      if (!caseId) return;
      setUpdatingCaseId(caseId);

      setCases((prev) =>
        prev.map((c) => (c._id === caseId ? { ...c, status: newStatus } : c))
      );

      try {
        const res = await api.put(`/queries/${caseId}`, { status: newStatus });
        const updated = res.data;
        if (updated && (updated._id || updated.id)) {
          setCases((prev) =>
            prev.map((c) =>
              String(c._id) === String(updated._id || updated.id)
                ? { ...c, ...updated }
                : c
            )
          );
        }
      } catch (error) {
        console.error("Failed to update case:", error);
        alert("Failed to update case status");
      } finally {
        setUpdatingCaseId(null);
      }
    },
    []
  );

  // -------- GET ASSIGNED DOCTOR INFO --------
  const getAssignedDoctor = useCallback(
    (assignedDoctorId) => {
      if (!assignedDoctorId) return null;
      if (typeof assignedDoctorId === "string") {
        return (
          doctors.find(
            (d) => d._id === assignedDoctorId || d.id === assignedDoctorId
          ) || { name: "Doctor", specialization: "" }
        );
      }
      return assignedDoctorId;
    },
    [doctors]
  );

  // -------- KPI CARDS CONFIG --------
  const cardConfigs = [
    { label: t('myCases.pending'), value: stats.pending, color: "bg-yellow-100 dark:bg-yellow-400/50", icon: "⏳", statusQuery: "Pending" },
    { label: t('facilitator.inProgress'), value: stats.inprogress, color: "bg-teal-100 dark:bg-teal-400/50", icon: "🔄", statusQuery: "In Progress" },
    { label: t('facilitator.followUps'), value: stats.followup, color: "bg-orange-100 dark:bg-orange-400/50", icon: "📌", statusQuery: "Follow Up" },
    { label: t('myCases.assigned'), value: stats.assigned, color: "bg-indigo-100 dark:bg-indigo-400/50", icon: "👨‍⚕️", statusQuery: "Assigned" },
    { label: t('myCases.responded'), value: stats.responded, color: "bg-green-100 dark:bg-green-400/50", icon: "✅", statusQuery: "Responded" },
    { label: t('myCases.rejected'), value: stats.rejected, color: "bg-red-100 dark:bg-red-400/50", icon: "❌", statusQuery: "Rejected" },
    { label: t('facilitator.failedCases'), value: stats.failed, color: "bg-gray-200 dark:bg-gray-400/50", icon: "⚠️", statusQuery: "Failed" }, // ✅ Added card
    { label: t('facilitator.totalCases'), value: stats.total, color: "bg-gray-100 dark:bg-gray-800", icon: "📋", statusQuery: "All" },
  ];

  const onCardClick = (status) => {
    status === "All" ? setSearchParams({}) : setSearchParams({ status });
  };

  // -------- CASE DETAILS MODAL --------
  const CaseDetailsModal = ({ item, onClose }) => {
    if (!item) return null;
    const assigned = getAssignedDoctor(item.assignedDoctorId);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full shadow-lg overflow-auto max-h-[90vh]">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Case Details</h3>
              <button className="text-gray-500 dark:text-gray-400" onClick={onClose}>✕</button>
            </div>

            <div className="space-y-4">
              <Info label="Patient" value={item.fullName} />
              <Info label="Reference ID" value={item.referenceId} mono />
              <Info label="Title" value={item.title} />
              <Info label="Description" value={item.description || "No description"} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info label="Country" value={item.country} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <select
                    value={item.status}
                    onChange={(e) => {
                      handleUpdateStatus(item._id, e.target.value);
                      setSelectedCase((prev) => ({ ...prev, status: e.target.value }));
                    }}
                    disabled={updatingCaseId === item._id}
                    className="mt-1 px-2 py-1 border rounded dark:border-gray-600 dark:bg-gray-700"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {assigned && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Assigned Doctor</p>
                  <p className="font-medium">{assigned.name}</p>
                  {assigned.specialization && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{assigned.specialization}</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                onClick={() =>
                  navigate(`/facilitator/case-by-ref?ref=${encodeURIComponent(item.referenceId || "")}`)
                }
                disabled={!item.referenceId}
              >
                Open Page
              </Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Info = ({ label, value, mono = false }) => (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`${mono ? "font-mono" : "font-medium"} text-base text-gray-900 dark:text-gray-100`}>
        {value || "—"}
      </p>
    </div>
  );

  return (
    <FacilitatorLayout
      title="Dashboard"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setSearchParams({}); setQ(""); }}>Reset</Button>
          <Button onClick={() => navigate("/facilitator/pending")}>⏳ View Pending</Button>
        </div>
      }
    >
      {/* KPI CARDS */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-8">

        {cardConfigs.map((card) => (
          <Card
            key={card.label}
            onClick={() => onCardClick(card.label)}
            className={`${card.color} p-5 rounded-lg shadow-sm hover:shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{card.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{card.value ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/60 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg">
                {card.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* RECENT CASES TABLE */}
      <div>
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Cases (Latest 6)</h2>
          <Button variant="outline" onClick={() => navigate("/facilitator/cases")}>
            View All Cases →
          </Button>
        </div>

        <Card className="overflow-hidden border dark:border-gray-700 shadow-lg dark:bg-gray-800">
          {loading ? (
            <TableShimmer rows={6} cols={8} />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-800 dark:text-gray-200">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <tr>
                    {["Patient", "Reference", "Title", "Country", "Assigned Doctor", "Status", "Created", "Actions"].map((head) => (
                      <th key={head} className="px-5 py-3 text-left font-semibold whitespace-nowrap">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentCases.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
                        No recent cases found.
                      </td>
                    </tr>
                  ) : (
                    recentCases.map((c) => {
                      const assigned = getAssignedDoctor(c.assignedDoctorId);
                      return (
                        <tr key={c._id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-5 py-3">{c.fullName || "—"}</td>
                          <td className="px-5 py-3 font-mono text-xs font-semibold">{c.referenceId || "—"}</td>
                          <td className="px-5 py-3 truncate max-w-xs">{c.title}</td>
                          <td className="px-5 py-3">{c.country}</td>
                          <td className="px-5 py-3">
                            {assigned ? (
                              <>
                                <div className="font-medium">{assigned.name}</div>
                                {assigned.specialization && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">{assigned.specialization}</div>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400">Not assigned</span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            <select
                              value={c.status || "Pending"}
                              onChange={(e) => handleUpdateStatus(c._id, e.target.value)}
                              disabled={updatingCaseId === c._id}
                              className="px-2 py-1 border rounded text-sm dark:border-gray-600 dark:bg-gray-700"
                            >
                              {STATUSES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="px-5 py-3">
                            <Button size="sm" onClick={() => setSelectedCase(c)}>View Details</Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {selectedCase && (
        <CaseDetailsModal item={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </FacilitatorLayout>
  );
}
