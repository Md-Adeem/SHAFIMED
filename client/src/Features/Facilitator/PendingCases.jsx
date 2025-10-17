// client/src/Features/Facilitator/PendingCases.jsx
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import CasesTable from "./CasesTable";
import { Loader2 } from "lucide-react";

export default function PendingCases() {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null); // track which case is being updated

  // Fetch pending cases
  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/queries", { params: { status: "Pending" } });
      setCases(data || []);
    } catch (err) {
      console.error("Error loading pending cases:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update case status (only modify that case instead of refreshing all)
  const handleStatus = async (c, status) => {
    try {
      setUpdating(c._id);
      const { data: updated } = await api.put(`/queries/${c._id}`, { status });

      // remove case from list if it’s no longer "Pending"
      if (status !== "Pending") {
        setCases((prev) => prev.filter((x) => x._id !== c._id));
      } else {
        setCases((prev) =>
          prev.map((x) => (x._id === c._id ? { ...x, ...updated } : x))
        );
      }
    } catch (err) {
      console.error("Error updating case:", err);
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <FacilitatorLayout
      title={t('facilitator.pendingCases')}
      actions={
        <Button onClick={refresh} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {t('facilitator.refresh')}
        </Button>
      }
    >
      {loading ? (
        <div className="flex justify-center items-center py-10 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          {t('facilitator.loadingCases')}
        </div>
      ) : cases.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {t('facilitator.noCasesAvailable')}
        </div>
      ) : (
        <CasesTable
          cases={cases}
          onStatus={handleStatus}
          updatingId={updating} // pass to show spinner per row
        />
      )}
    </FacilitatorLayout>
  );
}
