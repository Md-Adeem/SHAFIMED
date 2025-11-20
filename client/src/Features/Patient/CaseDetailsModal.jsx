// src/components/CaseDetailsModal.jsx
import React from "react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const CaseDetailsModal = ({ caseData, onClose }) => {
  if (!caseData) return null;

  const statusColor = caseData.status === "Pending" ? "yellow" : caseData.status === "Assigned" ? "blue" : caseData.status === "Closed" ? "green" : "red";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Case Details</h2>
          <Badge color={statusColor}>{caseData.status}</Badge>
        </div>

        <div className="px-6 py-5 space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Case Title</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{caseData.title}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Description</div>
            <div className="whitespace-pre-wrap">{caseData.description}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Country</div>
              <div>{caseData.country}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Contact</div>
              <div>{caseData.contact}</div>
            </div>
          </div>
          
          {/* Patient Profile Information */}
          {caseData.patientProfile && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Patient Profile Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Age</div>
                  <div>{caseData.patientProfile.age || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Gender</div>
                  <div>{caseData.patientProfile.gender || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Location</div>
                  <div>{caseData.patientProfile.location || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Blood Group</div>
                  <div>{caseData.patientProfile.bloodGroup || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Height</div>
                  <div>{caseData.patientProfile.height || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Weight</div>
                  <div>{caseData.patientProfile.weight || "Not provided"}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Medical History</div>
                <div>{caseData.patientProfile.medicalHistory || "Not provided"}</div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Current Medications</div>
                  <div>{caseData.patientProfile.currentMedications || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Allergies</div>
                  <div>{caseData.patientProfile.allergies || "Not provided"}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Emergency Contact</div>
                  <div>{caseData.patientProfile.emergencyContact || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Relation</div>
                  <div>{caseData.patientProfile.emergencyContactRelation || "Not provided"}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Insurance Info</div>
                <div>{caseData.patientProfile.insuranceInfo || "Not provided"}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Facilitator</div>
              <div>{caseData.assignedDoctorId?.name || "Not assigned"}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Response</div>
              <div>{caseData.response || "No response"}</div>
            </div>
          </div>

          {Array.isArray(caseData.attachments) && caseData.attachments.length > 0 && (
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Attachments</div>
              <ul className="list-disc list-inside text-sm">
                {caseData.attachments.map((a, idx) => (
                  <li key={idx}>
                    <a href={a} target="_blank" rel="noreferrer" className="text-cyan-700 dark:text-cyan-400 hover:underline">View File {idx + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;