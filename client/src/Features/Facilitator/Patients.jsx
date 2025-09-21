// client/src/Features/Facilitator/Patients.jsx
import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import { Card } from "../../components/ui/Card";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patients
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/users/patients");
        if (active) setPatients(data || []);
      } catch (err) {
        if (active) {
          console.error("Failed to load patients:", err);
          setError("Failed to load patients. Please try again.");
          setPatients([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false; // cleanup to avoid state update on unmounted component
    };
  }, []);

  // Filtered patients (memoized)
  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return patients.filter((p) => {
      if (!query) return true;
      const s = `${p.name} ${p.email} ${p.profile?.location || ""}`.toLowerCase();
      return s.includes(query);
    });
  }, [patients, q]);

  return (
    <FacilitatorLayout title="Patients">
      {/* Search Bar */}
      <Card className="p-4 mb-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, email, or location..."
          className="px-3 py-2 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <span className="text-sm text-gray-500">
          {filtered.length} of {patients.length} patients
        </span>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading patients...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No patients found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Name</th>
                  <th className="px-5 py-3 text-left font-semibold">Email</th>
                  <th className="px-5 py-3 text-left font-semibold">Age</th>
                  <th className="px-5 py-3 text-left font-semibold">Gender</th>
                  <th className="px-5 py-3 text-left font-semibold">Location</th>
                  <th className="px-5 py-3 text-left font-semibold">Medical History</th>
                  <th className="px-5 py-3 text-left font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-5 py-3">{p.email}</td>
                    <td className="px-5 py-3">{p.profile?.age ?? "—"}</td>
                    <td className="px-5 py-3">{p.profile?.gender ?? "—"}</td>
                    <td className="px-5 py-3">{p.profile?.location ?? "—"}</td>
                    <td
                      className="px-5 py-3 max-w-md truncate"
                      title={p.profile?.medicalHistory || ""}
                    >
                      {p.profile?.medicalHistory ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </FacilitatorLayout>
  );
}
