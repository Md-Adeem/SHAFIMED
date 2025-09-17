import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function ViewByRef() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("ref") || "";
  const [ref, setRef] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [item, setItem] = useState(null);

  const fetchByRef = async (r) => {
    if (!r) { setItem(null); return; }
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/queries/ref/${encodeURIComponent(r)}`);
      setItem(data || null);
    } catch (e) {
      setItem(null);
      setError(e.response?.data?.message || "Case not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initial) fetchByRef(initial);
  }, []); // eslint-disable-line

  const onSearch = async () => {
    setSearchParams(ref ? { ref } : {});
    fetchByRef(ref);
  };

  return (
    <FacilitatorLayout title="View by Reference ID">
      <Card className="p-4 mb-4">
        <div className="flex gap-2 flex-wrap items-center">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="Enter Reference ID (e.g., SHF-20250917-ABCD)"
            className="px-3 py-2 border rounded-lg w-full sm:w-96"
          />
          <Button onClick={onSearch} disabled={loading}>{loading ? "Searching..." : "Search"}</Button>
          <Button variant="outline" onClick={() => { setRef(""); setItem(null); setSearchParams({}); }}>Clear</Button>
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </Card>

      {item && (
        <Card className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Reference</div>
              <div className="font-mono">{item.referenceId || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Status</div>
              <div className="font-medium">{item.status || "Pending"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Patient</div>
              <div className="font-medium">{item.fullName || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Department</div>
              <div>{item.department || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Country</div>
              <div>{item.country || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Contact</div>
              <div>{item.contact || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Created</div>
              <div>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Updated</div>
              <div>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "—"}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Title</div>
            <div className="font-medium">{item.title}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Description</div>
            <div className="whitespace-pre-wrap">{item.description || "—"}</div>
          </div>

          {item.assignedDoctorId && (
            <div>
              <div className="text-xs text-gray-500">Assigned Doctor</div>
              <div className="font-medium">{item.assignedDoctorId.name}</div>
              {item.assignedDoctorId.specialization && (
                <div className="text-xs text-gray-500">{item.assignedDoctorId.specialization}</div>
              )}
            </div>
          )}

          {item.attachments?.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-1">Attachments</div>
              <ul className="list-disc list-inside text-sm">
                {item.attachments.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </Card>
      )}
    </FacilitatorLayout>
  );
}