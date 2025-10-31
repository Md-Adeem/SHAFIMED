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
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");

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

  // Get unique doctors and departments from cases for filters
  const doctors = Array.from(new Set(cases.map((c) => c.assignedDoctorId?.name).filter(Boolean)));
  const departments = Array.from(new Set(cases.map((c) => c.department).filter(Boolean)));

  // Apply combined filters
  useEffect(() => {
    let temp = [...cases];
    if (selectedStatus !== "All") temp = temp.filter((c) => c.status === selectedStatus);
    if (selectedDoctor !== "All") temp = temp.filter((c) => c.assignedDoctorId?.name === selectedDoctor);
    if (selectedDept !== "All") temp = temp.filter((c) => c.department === selectedDept);
    setFilteredCases(temp);
  }, [selectedStatus, selectedDoctor, selectedDept, cases]);

  useEffect(() => {
    fetchRunningCases();
  }, []);



  // Shimmer Loader UI
  const ShimmerLoader = () => (
    <div className="animate-pulse">

      {/* Table shimmer */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["Ref ID", "Patient", "Doctor", "Department", "Status", "Actions"].map(
                (head, i) => (
                  <th key={i} className="px-4 py-2 text-left text-gray-500">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((row) => (
              <tr key={row} className="border-t">
                {Array(6)
                  .fill(0)
                  .map((_, col) => (
                    <td key={col} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );



  return (
    <FacilitatorLayout
      title="Running Cases"
      actions={
        !loading && ( 
        <div className="flex flex-wrap items-center gap-3">
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

          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="All">All Doctors</option>
            {doctors.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <Button onClick={fetchRunningCases}>Refresh</Button>
        </div>
  )
      }
    >
      {loading ? (
  <ShimmerLoader />
) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredCases.length === 0 ? (
        <p>No cases found for selected filters.</p>
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
