// D:\SHAFIMED\client\src\Features\Facilitator\AssignDoctor.jsx
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Button from "../../components/ui/Button";

export default function AssignDoctor({ queryId, onAssigned }) {
  const [doctors, setDoctors] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch doctors when component mounts
 useEffect(() => {
  const loadDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/queries/doctors/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Doctors fetched:", data.data);
      setDoctors(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Failed to load doctors:", err);
      setDoctors([]);
    }
  };

  loadDoctors();
}, []);

  // Assign selected doctor to the query
  const handleAssign = async () => {
    if (!selected) return;
    setLoading(true);

    try {
      await api.put(`/queries/${queryId}`, {
        assignedDoctorId: selected,
        status: "Assigned",
      });

      onAssigned?.(); // refresh parent table
      setSelected(""); // reset selection
    } catch (err) {
      console.error("Assign doctor failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="px-2 py-1 border rounded"
      >
        <option value="">Select Doctor</option>
        {Array.isArray(doctors) &&
          doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} ({d.specialization || "General"})
            </option>
          ))}
      </select>

      <Button size="sm" onClick={handleAssign} disabled={!selected || loading}>
        {loading ? "Assigning..." : "Assign"}
      </Button>
    </div>
  );
}
