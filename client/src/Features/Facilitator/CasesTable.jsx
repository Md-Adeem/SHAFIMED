// D:\SHAFIMED\client\src\Features\Facilitator\CasesTable.jsx
// import { useMemo } from "react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Link } from "react-router-dom";
import AssignDoctor from "./AssignDoctor";


export default function CasesTable({ cases = [], onAssign, onView, onStatus }) {

  const onMarkInProgress = (c) => {
    onStatus?.(c, "In Progress");
  }
  const statusToColor = (s) =>
    s === "Pending"
      ? "yellow"
      : s === "Assigned"
      ? "blue"
      : s === "Responded"
      ? "green"
      : s === "In Progress"
      ? "blue"
      : s === "Follow Up"
      ? "yellow"
      : "red";
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Patient</th>
              <th className="px-5 py-3 text-left font-semibold">Reference</th>
              <th className="px-5 py-3 text-left font-semibold">Title</th>
              <th className="px-5 py-3 text-left font-semibold">Department</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
              <th className="px-5 py-3 text-left font-semibold">Created</th>
              <th className="px-5 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No cases found.
                </td>
              </tr>
            ) : (
              cases.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-900">
                    {c.fullName || "—"}
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">
                    {c.referenceId || "—"}
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">
                    {c.title}
                  </td>
                  <td className="px-5 py-3">{c.department || "—"}</td>
                  <td className="px-5 py-3">
  {c.assignedDoctorId ? (
    <div>
      <div className="font-medium text-gray-900">
        {c.assignedDoctorId.name}
      </div>
      <div className="text-xs text-gray-500">
        {c.assignedDoctorId.specialization || "General"}
      </div>
    </div>
  ) : (
    <AssignDoctor queryId={c._id} onAssigned={() => onAssign?.()} />
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
                           onClick={() => onMarkInProgress?.(c)}
                        >
                          Mark In Progress
                        </Button>
                      )}
                      {c.status === "In Progress" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onStatus?.(c, "Follow Up")}
                        >
                          Mark Follow Up
                        </Button>
                      )}
                      {c.status === "Assigned" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onStatus?.(c, "In Progress")}
                        >
                          Mark In Progress
                        </Button>
                      )}
                      {(c.status === "Follow Up" ||
                        c.status === "In Progress" ||
                        c.status === "Assigned") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onStatus?.(c, "Responded")}
                        >
                          Mark Responded
                        </Button>
                      )}

                      {/* existing buttons... */}
                      {/* <Button size="sm" onClick={() => onView?.(c)}>View Details by id</Button> */}
                      <Link
                        to={
                          c.referenceId
                            ? `/facilitator/case-by-ref?ref=${encodeURIComponent(
                                c.referenceId
                              )}`
                            : "#"
                        }
                        className={`px-3 py-1.5 text-sm rounded font-medium transition ${
                          c.referenceId
                            ? "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          if (!c.referenceId) e.preventDefault();
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}