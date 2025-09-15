// src/components/CaseDetailsModal.jsx
import React from "react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const CaseDetailsModal = ({ caseData, onClose }) => {
  if (!caseData) return null;

  const statusColor = caseData.status === "Pending" ? "yellow" : caseData.status === "Assigned" ? "blue" : caseData.status === "Responded" ? "green" : "red";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Case details</h2>
          <Badge color={statusColor}>{caseData.status}</Badge>
        </div>

        <div className="px-6 py-5 space-y-4 text-gray-700">
          <div>
            <div className="text-xs uppercase text-gray-500">Title</div>
            <div className="font-semibold text-gray-900">{caseData.title}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-gray-500">Description</div>
            <div className="whitespace-pre-wrap">{caseData.description}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase text-gray-500">Country</div>
              <div>{caseData.country}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500">Contact</div>
              <div>{caseData.contact}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase text-gray-500">Facilitator</div>
              <div>{caseData.assignedDoctorId?.name || "Not Assigned"}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500">Response</div>
              <div>{caseData.response || "No response yet"}</div>
            </div>
          </div>

          {Array.isArray(caseData.attachments) && caseData.attachments.length > 0 && (
            <div>
              <div className="text-xs uppercase text-gray-500 mb-1">Attachments</div>
              <ul className="list-disc list-inside text-sm">
                {caseData.attachments.map((a, idx) => (
                  <li key={idx}>
                    <a href={a} target="_blank" rel="noreferrer" className="text-cyan-700 hover:underline">View file {idx + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;
