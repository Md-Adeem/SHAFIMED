// src/components/CaseDetailsModal.jsx
import React from "react";
import { useTranslation } from 'react-i18next';
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const CaseDetailsModal = ({ caseData, onClose }) => {
  const { t } = useTranslation();
  
  if (!caseData) return null;

  const statusColor = caseData.status === "Pending" ? "yellow" : caseData.status === "Assigned" ? "blue" : caseData.status === "Closed" ? "green" : "red";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{t('caseDetails.title')}</h2>
          <Badge color={statusColor}>{caseData.status}</Badge>
        </div>

        <div className="px-6 py-5 space-y-4 text-gray-700">
          <div>
            <div className="text-xs uppercase text-gray-500">{t('caseDetails.caseTitle')}</div>
            <div className="font-semibold text-gray-900">{caseData.title}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-gray-500">{t('caseDetails.description')}</div>
            <div className="whitespace-pre-wrap">{caseData.description}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase text-gray-500">{t('caseDetails.country')}</div>
              <div>{caseData.country}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500">{t('caseDetails.contact')}</div>
              <div>{caseData.contact}</div>
            </div>
          </div>
          
          {/* Patient Profile Information */}
          {caseData.patientProfile && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('caseDetails.patientProfileInfo')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.age')}</div>
                  <div>{caseData.patientProfile.age || t('caseDetails.notProvided')}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.gender')}</div>
                  <div>{caseData.patientProfile.gender || t('caseDetails.notProvided')}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.location')}</div>
                  <div>{caseData.patientProfile.location || t('caseDetails.notProvided')}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.bloodGroup')}</div>
                  <div>{caseData.patientProfile.bloodGroup || t('caseDetails.notProvided')}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.height')}</div>
                  <div>{caseData.patientProfile.height || t('caseDetails.notProvided')}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.weight')}</div>
                  <div>{caseData.patientProfile.weight || t('caseDetails.notProvided')}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs uppercase text-gray-500">{t('caseDetails.medicalHistory')}</div>
                <div>{caseData.patientProfile.medicalHistory || t('caseDetails.notProvided')}</div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.currentMedications')}</div>
                  <div>{caseData.patientProfile.currentMedications || t('caseDetails.notProvided')}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.allergies')}</div>
                  <div>{caseData.patientProfile.allergies || t('caseDetails.notProvided')}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.emergencyContact')}</div>
                  <div>{caseData.patientProfile.emergencyContact || t('caseDetails.notProvided')}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500">{t('caseDetails.relation')}</div>
                  <div>{caseData.patientProfile.emergencyContactRelation || t('caseDetails.notProvided')}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs uppercase text-gray-500">{t('caseDetails.insuranceInfo')}</div>
                <div>{caseData.patientProfile.insuranceInfo || t('caseDetails.notProvided')}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase text-gray-500">{t('caseDetails.facilitator')}</div>
              <div>{caseData.assignedDoctorId?.name || t('caseDetails.notAssigned')}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500">{t('caseDetails.response')}</div>
              <div>{caseData.response || t('caseDetails.noResponse')}</div>
            </div>
          </div>

          {Array.isArray(caseData.attachments) && caseData.attachments.length > 0 && (
            <div>
              <div className="text-xs uppercase text-gray-500 mb-1">{t('caseDetails.attachments')}</div>
              <ul className="list-disc list-inside text-sm">
                {caseData.attachments.map((a, idx) => (
                  <li key={idx}>
                    <a href={a} target="_blank" rel="noreferrer" className="text-cyan-700 hover:underline">{t('caseDetails.viewFile')} {idx + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>{t('caseDetails.close')}</Button>
          <Button onClick={onClose}>{t('caseDetails.done')}</Button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;