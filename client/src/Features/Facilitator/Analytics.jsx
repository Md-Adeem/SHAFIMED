
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [data, setData] = useState({ totals: 0, byStatus: [], byDepartment: [] });
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

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <FacilitatorLayout title={t("facilitator.analytics")}>
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">{t("facilitator.totalCases")}</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.totals}</div>
        </Card>
        <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">{t("myCases.pending")}</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {statusMap["Pending"] || 0}
          </div>
        </Card>
        <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">{t("facilitator.inProgress")}</div>
          <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
            {statusMap["In Progress"] || 0}
          </div>
        </Card>
      </div>

      {loading ? (
        <ShimmerAnalytics />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* By Status Chart */}
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-[540px]"> 
  <div className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
    {t("facilitator.byStatus")}
  </div>
  {data.byStatus.length > 0 ? (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data.byStatus}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={50}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.byStatus.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]} // Ensures color consistency
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#D3D3D3",
            color: "#f9fafb",
            borderRadius: "8px",
          }}
        />
        <Legend
          layout="vertical"
          verticalAlign="top"
          align="left"
          wrapperStyle={{
            fontSize: "14px",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <p className="text-gray-500 dark:text-gray-400 text-center py-5">
      No status data available.
    </p>
  )}
</Card>


          {/* By Department Chart */}
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-[540px]"> {/* Increased height */}
            <div className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
              {t("facilitator.byDepartment")}
            </div>
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.byDepartment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#D3D3D3",
                      color: "#f9fafb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    layout="vertical"  
                    verticalAlign="top"
                    align="left"
                    wrapperStyle={{
                      fontSize: "13px",
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-5">
                No department data available.
              </p>
            )}
          </Card>
        </div>
      )}
    </FacilitatorLayout>
  );
}

