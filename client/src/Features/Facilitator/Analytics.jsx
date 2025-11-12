import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import { Card } from "../../components/ui/Card";
import ShimmerAnalytics from "../../components/ui/ShimmerAnalytics";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState({
    totals: 0,
    byStatus: [],
    byDepartment: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/queries/analytics/summary");
        setData(data || { totals: 0, byStatus: [], byDepartment: [] });
      } catch (err) {
        console.error("Error loading analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusMap = useMemo(
    () => Object.fromEntries(data.byStatus.map((s) => [s._id, s.count])),
    [data]
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4C4C",
    "#7FFF00",
    "#FF69B4",
    "#40E0D0",
    "#FFD700",
  ];

  if (loading) {
    return (
      <FacilitatorLayout title="Analytics">
        <ShimmerAnalytics />
      </FacilitatorLayout>
    );
  }

  return (
    <FacilitatorLayout title="Analytics">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Total Cases</div>
          <div className="text-3xl font-bold text-gray-900">{data.totals}</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600">Pending Cases</div>
          <div className="text-3xl font-bold text-yellow-600">
            {statusMap["Pending"] || 0}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600">In Progress</div>
          <div className="text-3xl font-bold text-teal-600">
            {statusMap["In Progress"] || 0}
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="text-lg font-bold mb-3">Cases by Status</div>
          <ul className="space-y-2">
            {data.byStatus.map((s) => (
              <li key={s._id} className="flex justify-between text-sm">
                <span className="text-gray-700">{s._id}</span>
                <span className="font-semibold">{s.count}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <div className="text-lg font-bold mb-3">Cases by Department</div>
          {data.byDepartment.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data.byDepartment}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  innerRadius={50}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {data.byDepartment.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    fontSize: "12px",
                    flexWrap: "wrap",
                    maxWidth: "90%",
                    margin: "auto",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-5">
              No department data available.
            </p>
          )}
        </Card>
      </div>
    </FacilitatorLayout>
  );
}
