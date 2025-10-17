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

const statusOptions = [
  "All",
  "Pending",
  "Assigned",
  "In Progress",
  "Follow Up",
  "Responded",
  "Closed",
];

const RunningCases = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const fetchRunningCases = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/queries/running");
      const fetchedCases = Array.isArray(data) ? data : [];
      setCases(fetchedCases);
      setFilteredCases(fetchedCases);
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

  // Apply filter whenever selectedStatus changes
  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredCases(cases);
    } else {
      setFilteredCases(cases.filter((c) => c.status === selectedStatus));
    }
  }, [selectedStatus, cases]);

  useEffect(() => {
    fetchRunningCases();
  }, []);

  return (
    <FacilitatorLayout
      title="Running Cases"
      actions={
        <div className="flex items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Button onClick={fetchRunningCases}>Refresh</Button>
        </div>
      }
    >
      {loading ? (
        <p>Loading running cases...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredCases.length === 0 ? (
        <p>No {selectedStatus !== "All" ? selectedStatus.toLowerCase() : ""} cases found.</p>
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
              {filteredCases.map((c) => (
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
