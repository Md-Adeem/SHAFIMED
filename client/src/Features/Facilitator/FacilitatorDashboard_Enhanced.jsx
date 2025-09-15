import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";

export default function FacilitatorDashboard() {
  const [cases, setCases] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [caseToAssign, setCaseToAssign] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [casesRes, doctorsRes] = await Promise.all([
          api.get("/queries"),
          api.get("/users/doctors")
        ]);
        setCases(casesRes.data || []);
        setDoctors(doctorsRes.data || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setCases([]);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return cases
      .filter((c) => (tab === "All" ? true : c.status === tab))
      .filter((c) => (!q ? true : c.title.toLowerCase().includes(q.toLowerCase())));
  }, [cases, tab, q]);

  const stats = useMemo(() => {
    const total = cases.length;
    const pending = cases.filter(c => c.status === "Pending").length;
    const assigned = cases.filter(c => c.status === "Assigned").length;
    const responded = cases.filter(c => c.status === "Responded").length;
    const rejected = cases.filter(c => c.status === "Rejected").length;
    
    return { total, pending, assigned, responded, rejected };
  }, [cases]);

  const statusToColor = (s) => (s === "Pending" ? "yellow" : s === "Assigned" ? "blue" : s === "Responded" ? "green" : "red");

  const handleAssignCase = async (caseId, doctorId) => {
    try {
      await api.put(`/queries/${caseId}`, { 
        status: "Assigned", 
        assignedDoctorId: doctorId 
      });
      setCases(prev => prev.map(c => 
        c._id === caseId 
          ? { 
              ...c, 
              status: "Assigned", 
              assignedDoctorId: doctors.find(d => d._id === doctorId) 
            } 
          : c
      ));
      setAssignModalOpen(false);
      setCaseToAssign(null);
      alert("Doctor assigned successfully!");
    } catch (err) {
      console.error("Failed to assign doctor:", err);
      alert("Failed to assign doctor");
    }
  };

  const openAssignModal = (caseData) => {
    setCaseToAssign(caseData);
    setAssignModalOpen(true);
  };

  const handleUpdateStatus = async (caseId, newStatus) => {
    try {
      await api.put(`/queries/${caseId}`, { status: newStatus });
      setCases(prev => prev.map(c => c._id === caseId ? { ...c, status: newStatus } : c));
      alert(`Case status updated to ${newStatus}!`);
    } catch (err) {
      console.error("Failed to update case status:", err);
      alert("Failed to update case status");
    }
  };

  if (loading) {
    return (
      <FacilitatorLayout title="Dashboard" actions={<Button onClick={() => window.location.reload()}>Refresh</Button>}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-24"></div>
            ))}
          </div>
          <div className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
        </div>
      </FacilitatorLayout>
    );
  }

  return (
    <FacilitatorLayout
      title="Dashboard"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            🔄 Refresh
          </Button>
          <Button onClick={() => setTab("Pending")}>
            ⏳ View Pending
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              📋
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              ⏳
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assigned</p>
              <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              👨‍⚕️
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Responded</p>
              <p className="text-2xl font-bold text-green-600">{stats.responded}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              ✅
            </div>
          </div>
        </Card>
      </div>

      {/* Cases Table */}
      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            {(["All", "Pending", "Assigned", "Responded", "Rejected"]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  tab === t 
                    ? "bg-cyan-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t} ({t === "All" ? stats.total : stats[t.toLowerCase()]})
              </button>
            ))}
          </div>
          <div className="ml-auto w-full sm:w-64">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or patient..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Patient</th>
                <th className="px-5 py-3 text-left font-semibold">Title</th>
                <th className="px-5 py-3 text-left font-semibold">Country</th>
                <th className="px-5 py-3 text-left font-semibold">Assigned Doctor</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-left font-semibold">Created</th>
                <th className="px-5 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-10 text-center text-gray-500">
                    {q ? "No cases match your search." : "No cases found."}
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c._id} className="border-t hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-900">{c.fullName || "—"}</td>
                    <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">{c.title}</td>
                    <td className="px-5 py-3">{c.country}</td>
                    <td className="px-5 py-3">
                      {c.assignedDoctorId ? (
                        <div>
                          <div className="font-medium text-gray-900">{c.assignedDoctorId.name}</div>
                          <div className="text-xs text-gray-500">{c.assignedDoctorId.specialization || "General"}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <Badge color={statusToColor(c.status)}>{c.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        {c.status === "Pending" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openAssignModal(c)}
                          >
                            Assign Doctor
                          </Button>
                        )}
                        {c.status === "Assigned" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUpdateStatus(c._id, "Responded")}
                          >
                            Mark Responded
                          </Button>
                        )}
                        <Button 
                          size="sm"
                          onClick={() => setSelectedCase(c)}
                        >
                          View Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Case Details</h3>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Patient Name</label>
                  <p className="text-gray-900">{selectedCase.fullName || "—"}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Title</label>
                  <p className="text-gray-900">{selectedCase.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p className="text-gray-900">{selectedCase.description || "No description provided"}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Country</label>
                    <p className="text-gray-900">{selectedCase.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <div className="mt-1">
                      <Badge color={statusToColor(selectedCase.status)}>{selectedCase.status}</Badge>
                    </div>
                  </div>
                </div>
                
                {selectedCase.assignedDoctorId && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Assigned Doctor</label>
                    <div className="mt-1">
                      <p className="text-gray-900">{selectedCase.assignedDoctorId.name}</p>
                      <p className="text-sm text-gray-500">{selectedCase.assignedDoctorId.specialization || "General"}</p>
                    </div>
                  </div>
                )}
                
                {selectedCase.attachments && selectedCase.attachments.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Attachments</label>
                    <div className="mt-2 space-y-2">
                      {selectedCase.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <span>📎</span>
                          <span className="text-sm text-gray-700">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  {selectedCase.status === "Pending" && (
                    <Button onClick={() => {
                      openAssignModal(selectedCase);
                      setSelectedCase(null);
                    }}>
                      Assign Doctor
                    </Button>
                  )}
                  {selectedCase.status === "Assigned" && (
                    <Button onClick={() => {
                      handleUpdateStatus(selectedCase._id, "Responded");
                      setSelectedCase(null);
                    }}>
                      Mark as Responded
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedCase(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Assignment Modal */}
      {assignModalOpen && caseToAssign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Assign Doctor</h3>
                <button
                  onClick={() => setAssignModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Case: {caseToAssign.title}</p>
                <p className="text-sm text-gray-600">Patient: {caseToAssign.fullName}</p>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-600">Select Doctor:</label>
                {doctors.length === 0 ? (
                  <p className="text-sm text-gray-500">No doctors available</p>
                ) : (
                  doctors.map((doctor) => (
                    <button
                      key={doctor._id}
                      onClick={() => handleAssignCase(caseToAssign._id, doctor._id)}
                      className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{doctor.name}</div>
                      <div className="text-sm text-gray-500">{doctor.specialization || "General"}</div>
                      <div className="text-xs text-gray-400">{doctor.email}</div>
                    </button>
                  ))
                )}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setAssignModalOpen(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </FacilitatorLayout>
  );
}