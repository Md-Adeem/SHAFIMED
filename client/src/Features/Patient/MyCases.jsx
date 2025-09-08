
import { useEffect, useState } from "react";
import axios from "axios";
// import CaseDetailsModal from "./CaseDetailsModal";
import CaseDetailsModal from "./CaseDetailsModal";

function MyCases() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);

  // Fetch all cases of logged-in user
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/queries/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(res.data);
      } catch (err) {
        console.error("Error fetching cases:", err);
      }
    };
    fetchCases();
  }, []);

  // Count cases by status
  const statusCounts = {
    Pending: cases.filter((c) => c.status === "Pending").length,
    Assigned: cases.filter((c) => c.status === "Assigned").length,
    Responded: cases.filter((c) => c.status === "Responded").length,
    Rejected: cases.filter((c) => c.status === "Rejected").length,
  };

  return (
    // <div className="p-6 min-h-screen bg-gray-50">
      <div
  className="p-6 min-h-screen"
  style={{ backgroundColor: "rgb(157 224 255)" }}
>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📂 My Cases</h1>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-yellow-400 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-3xl font-bold">{statusCounts.Pending}</p>
          <p className="text-sm mt-2">Click to view</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">In Progress</h2>
          <p className="text-3xl font-bold">{statusCounts.Assigned}</p>
          <p className="text-sm mt-2">Click to view</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Resolved</h2>
          <p className="text-3xl font-bold">{statusCounts.Responded}</p>
          <p className="text-sm mt-2">Click to view</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Rejected</h2>
          <p className="text-3xl font-bold">{statusCounts.Rejected}</p>
          <p className="text-sm mt-2">Click to view</p>
        </div>
      </div>

      {/* Table of cases */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Case ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No cases submitted yet.
                </td>
              </tr>
            ) : (
              cases.map((c) => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{c._id}</td>
                  <td className="px-6 py-3">{c.title}</td>
                  <td className="px-6 py-3">{c.country}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        c.status === "Pending"
                          ? "bg-yellow-500"
                          : c.status === "Assigned"
                          ? "bg-blue-500"
                          : c.status === "Responded"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>



        {selectedCase && (
        <CaseDetailsModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}



    </div>
  );
}

export default MyCases;
