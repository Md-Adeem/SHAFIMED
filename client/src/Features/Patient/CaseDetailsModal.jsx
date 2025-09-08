// src/components/CaseDetailsModal.jsx
import React from "react";

const CaseDetailsModal = ({ caseData, onClose }) => {
  if (!caseData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          Case Details
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">ID:</span> {caseData._id}</p>
          <p><span className="font-semibold">Title:</span> {caseData.title}</p>
          <p className="break-words">
            <span className="font-semibold">Description:</span>{" "}
            {caseData.description}
          </p>
          <p><span className="font-semibold">Country:</span> {caseData.country}</p>
          <p><span className="font-semibold">Contact:</span> {caseData.contact}</p>
          <p>
            <span className="font-semibold">Facilitator:</span>{" "}
            {caseData.assignedDoctorId?.name || "Not Assigned"}
          </p>
          <p>
            <span className="font-semibold">Response:</span>{" "}
            {caseData.response || "No response yet"}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white text-xs ${
                caseData.status === "Pending"
                  ? "bg-yellow-500"
                  : caseData.status === "Assigned"
                  ? "bg-blue-500"
                  : caseData.status === "Responded"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {caseData.status}
            </span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CaseDetailsModal;
