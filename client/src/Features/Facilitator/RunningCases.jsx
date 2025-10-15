// RunningCases.jsx
import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";

const statusToColor = (status) =>
  status === "Pending"
    ? "yellow"
    : status === "Assigned"
    ? "blue"
    : status === "Responded"
    ? "green"
    : status === "In Progress"
    ? "blue"
    : status === "Follow Up"
    ? "yellow"
    : "red";

const RunningCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRunningCases = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/queries/running");
      setCases(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load running cases.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/queries/${id}`, { status });
      fetchRunningCases();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchRunningCases();
  }, []);

  return (
    <FacilitatorLayout title="Running Cases" actions={<Button onClick={fetchRunningCases}>Refresh</Button>}>
      {loading ? (
        <p>Loading running cases...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cases.length === 0 ? (
        <p>No running cases found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Reference ID</th>
                <th className="px-4 py-2 text-left">Patient</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{c.referenceId || "N/A"}</td>
                  <td className="px-4 py-2">{c.patientId?.name || "N/A"}</td>
                  <td className="px-4 py-2">{c.assignedDoctorId?.name || "N/A"}</td>
                  <td className="px-4 py-2">{c.department || "N/A"}</td>
                  <td className="px-4 py-2">
                    <Badge color={statusToColor(c.status)}>{c.status || "N/A"}</Badge>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateStatus(c._id, "Follow Up")}>
                      Mark Follow Up
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateStatus(c._id, "Responded")}>
                      Mark Responded
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </FacilitatorLayout>
  );
};

export default RunningCases;
