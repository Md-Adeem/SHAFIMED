import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

/**
 * FacilitatorDashboard (quality-refactor)
 *
 * - Safe stats calculation (handles missing status)
 * - Robust handleUpdateStatus (handles different API shapes)
 * - Subtle pastel KPI cards (clickable, sets ?status=)
 * - Safe rendering for assignedDoctorId (populated object or id)
 * - Lightweight Case Details modal (allows status change)
 */

const STATUSES = [
  "Pending",
  "Assigned",
  "In Progress",
  "Follow Up",
  "Responded",
  "Rejected",
];

export default function FacilitatorDashboard() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [updatingCaseId, setUpdatingCaseId] = useState(null); // disable UI while updating
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // -- Load initial data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [casesRes, doctorsRes] = await Promise.all([
          api.get("/queries"),
          api.get("/users/doctors"),
        ]);
        setCases(Array.isArray(casesRes.data) ? casesRes.data : []);
        setDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data : []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setCases([]);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // -- Sync tab with ?status= query param (clicking cards will set this)
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (!statusParam) {
      setTab("All");
      return;
    }
    // Accept either exact match or fall back to "All"
    const matched = STATUSES.find((s) => s.toLowerCase() === statusParam.toLowerCase());
    setTab(matched || "All");
  }, [searchParams]);

  // -- Safe filtered list for main dashboard (recent cases only)
  const recentCases = useMemo(() => {
    return cases
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
      .slice(0, 6); // Take only first 6 cases
  }, [cases]);

  // -- Safe filtered list for search/filter (kept for future use)
  const filtered = useMemo(() => {
    return cases
      .filter((c) => (tab === "All" ? true : c.status === tab))
      .filter((c) => (!q ? true : (c.title || "").toLowerCase().includes(q.toLowerCase())));
  }, [cases, tab, q]);

  // -- Robust stats (always produces known keys)
  const stats = useMemo(() => {
    const acc = {
      total: 0,
      pending: 0,
      assigned: 0,
      inprogress: 0,
      followup: 0,
      responded: 0,
      rejected: 0,
      unknown: 0,
    };

    for (const c of cases) {
      acc.total++;
      const raw = (c && c.status) || "Unknown";
      const key = raw.toString().toLowerCase().replace(/\s+/g, "");
      if (key === "pending") acc.pending++;
      else if (key === "assigned") acc.assigned++;
      else if (key === "inprogress") acc.inprogress++;
      else if (key === "followup") acc.followup++;
      else if (key === "responded") acc.responded++;
      else if (key === "rejected") acc.rejected++;
      else acc.unknown++;
    }

    return acc;
  }, [cases]);

  // Helper: try to extract updated case from various possible response shapes
  const extractUpdatedCase = (resData) => {
    if (!resData) return null;
    // If response is wrapper object with known keys:
    if (resData._id || resData.id) return resData;
    const tryKeys = ["case", "data", "result", "payload"];
    for (const k of tryKeys) {
      if (resData[k] && (resData[k]._id || resData[k].id)) return resData[k];
    }
    // fallback: if it has a single nested object with _id
    const values = Object.values(resData).filter((v) => v && typeof v === "object");
    for (const v of values) {
      if (v._id || v.id) return v;
    }
    return null;
  };

  // -- Update status (optimistic + reconcile). Safe merging.
  const handleUpdateStatus = useCallback(
    async (caseId, newStatus) => {
      // quick guard
      if (!caseId) return;
      setUpdatingCaseId(caseId);

      // optimistic update (so UI doesn't feel blocked)
      setCases((prev) => prev.map((c) => (c._id === caseId ? { ...c, status: newStatus } : c)));

      try {
        const res = await api.put(`/queries/${caseId}`, { status: newStatus });
        const updated = extractUpdatedCase(res.data) ?? res.data;

        if (updated && (updated._id || updated.id)) {
          // ensure consistent _id key
          const updatedId = updated._id || updated.id;
          setCases((prev) =>
            prev.map((c) => (String(c._id) === String(updatedId) ? { ...c, ...updated } : c))
          );

          // if this case is currently open in modal, refresh it
          if (selectedCase && String(selectedCase._id) === String(updatedId)) {
            setSelectedCase((prev) => ({ ...(prev || {}), ...updated }));
          }
        } else {
          // If we couldn't parse response, we've already done optimistic update; keep it
          console.warn("Update returned unexpected shape; kept optimistic update.", res.data);
        }
      } catch (err) {
        console.error("Failed to update case status:", err);
        // revert optimistic update: re-fetch single case or refresh list (simple approach: re-fetch all)
        try {
          const list = await api.get("/queries");
          setCases(Array.isArray(list.data) ? list.data : []);
        } catch (reFetchErr) {
          console.error("Failed re-fetch after failed update:", reFetchErr);
        }
        alert("Failed to update case status");
      } finally {
        setUpdatingCaseId(null);
      }
    },
    [selectedCase]
  );

  // Helper to render assigned doctor info (handles id-string or populated object)
  const getAssignedDoctor = useCallback(
    (assignedDoctorId) => {
      if (!assignedDoctorId) return null;
      if (typeof assignedDoctorId === "string") {
        // try to resolve from doctors list
        const doc = doctors.find((d) => d._id === assignedDoctorId || d.id === assignedDoctorId);
        return doc || { name: "Doctor", specialization: "" };
      }
      // assume it's an object
      return assignedDoctorId || null;
    },
    [doctors]
  );

  // Card configs (subtle pastel backgrounds)
  const cardConfigs = [
    { label: t('myCases.pending'), value: stats.pending, color: "bg-yellow-50", icon: "⏳", statusQuery: "Pending" },
    { label: t('facilitator.inProgress'), value: stats.inprogress, color: "bg-teal-50", icon: "🔄", statusQuery: "In Progress" },
    { label: t('facilitator.followUps'), value: stats.followup, color: "bg-orange-50", icon: "📌", statusQuery: "Follow Up" },
    { label: t('myCases.assigned'), value: stats.assigned, color: "bg-indigo-50", icon: "👨‍⚕️", statusQuery: "Assigned" },
    { label: t('myCases.responded'), value: stats.responded, color: "bg-green-50", icon: "✅", statusQuery: "Responded" },
    { label: t('myCases.rejected'), value: stats.rejected, color: "bg-red-50", icon: "❌", statusQuery: "Rejected" },
    { label: t('facilitator.totalCases'), value: stats.total, color: "bg-gray-50", icon: "📋", statusQuery: "All" },
    { label: t('facilitator.failedCases'), value: stats.failed, color: "bg-gray-50", icon: "📋", statusQuery: "Failed Cases" },
  ];

  // click a card -> set ?status=... (which syncs tab via effect)
  const onCardClick = (statusQuery) => {
    if (statusQuery === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ status: statusQuery });
    }
  };

  // Case Details modal content (simple)
  const CaseDetailsModal = ({ item, onClose }) => {
    if (!item) return null;
    const assigned = getAssignedDoctor(item.assignedDoctorId);

    return (
      <div className="fixed inset-0  z-50 flex items-center justify-center p-4">
        <div className="absolute  inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white rounded-lg max-w-2xl w-full shadow-lg overflow-auto max-h-[90vh]">
          <div className="p-6 ">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Case Details</h3>
              <button className="text-gray-500" onClick={onClose}>✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="text-lg font-medium">{item.fullName || "—"}</p>
              </div>

              <div>
              <p className="text-sm text-gray-500">Reference ID</p>
              <p className="font-mono">{item.referenceId || "—"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="text-lg">{item.title}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-base whitespace-pre-wrap">{item.description || "No description provided"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p>{item.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">
                    <select
                      value={item.status}
                      onChange={(e) => {
                        handleUpdateStatus(item._id, e.target.value);
                        // update currently-open modal view optimistically
                        setSelectedCase((prev) => ({ ...(prev || {}), status: e.target.value }));
                      }}
                      disabled={updatingCaseId === item._id}
                      className="px-2 py-1 border rounded"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {assigned && (
                <div>
                  <p className="text-sm text-gray-500">Assigned Doctor</p>
                  <p className="font-medium">{assigned.name}</p>
                  {assigned.specialization && <p className="text-xs text-gray-500">{assigned.specialization}</p>}
                </div>
              )}

              {item.attachments && item.attachments.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500">Attachments</p>
                  <div className="mt-2 space-y-2">
                    {item.attachments.map((a, idx) => (
                      <div key={idx} className="flex gap-2 items-center p-2 bg-gray-50 rounded">
                        <span>📎</span>
                        <span className="text-sm">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2 justify-end">
            <Button onClick={() => navigate(`/facilitator/case-by-ref?ref=${encodeURIComponent(item.referenceId || "")}`)} disabled={!item.referenceId}>
                Open page
             </Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <FacilitatorLayout
      title="Dashboard"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setSearchParams({}); setQ(""); }}>Reset</Button>
          <Button onClick={() => setTab("Pending")}>⏳ View Pending</Button>
        </div>
      }
    >
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardConfigs.map((card) => (
          <Card
            key={card.label}
            onClick={() => onCardClick(card.statusQuery)}
            className={`${card.color} p-5 rounded-lg text-gray-900 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-0.5 cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.label}</p>
                <div className="text-2xl font-semibold">{card.value ?? 0}</div>
              </div>
              <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center text-lg">
                {card.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Cases Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Cases (Latest 6)</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate("/facilitator/cases")}
            className="text-sm"
          >
            View All Cases →
          </Button>
        </div>

        <Card className="overflow-hidden border shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Patient</th>
                  <th className="px-5 py-3 text-left font-semibold">Reference</th>
                  <th className="px-5 py-3 text-left font-semibold">Title</th>
                  <th className="px-5 py-3 text-left font-semibold">Country</th>
                  <th className="px-5 py-3 text-left font-semibold">Assigned Doctor</th>
                  <th className="px-5 py-3 text-left font-semibold">Status</th>
                  <th className="px-5 py-3 text-left font-semibold">Created</th>
                  <th className="px-5 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentCases.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-10 text-center text-gray-500">No recent cases found.</td>
                  </tr>
                ) : (
                  recentCases.map((c) => {
                    const assigned = getAssignedDoctor(c.assignedDoctorId);
                    return (
                      <tr key={c._id} className="border-t hover:bg-gray-50">
                        <td className="px-5 py-3">{c.fullName || "—"}</td>
                        <td className="px-5 py-3 font-bold text-xs">{c.referenceId || "—"}</td>
                        <td className="px-5 py-3 font-medium max-w-xs truncate">{c.title}</td>
                        <td className="px-5 py-3">{c.country}</td>
                        <td className="px-5 py-3">
                          {assigned ? (
                            <>
                              <div className="font-medium">{assigned.name}</div>
                              {assigned.specialization && <div className="text-xs text-gray-500">{assigned.specialization}</div>}
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
                            className="px-2 py-1 border rounded text-sm"
                          >
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-5 py-3 text-gray-600">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}</td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => setSelectedCase(c)}>View Details</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Case details modal */}
      {selectedCase && <CaseDetailsModal item={selectedCase} onClose={() => setSelectedCase(null)} />}
    </FacilitatorLayout>
  );
}
