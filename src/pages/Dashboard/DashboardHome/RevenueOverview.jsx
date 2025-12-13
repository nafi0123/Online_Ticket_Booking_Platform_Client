import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const RevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: revenueOverview = [], isLoading } = useQuery({
    queryKey: ["revenue-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/revenue-overview?vendor_email=${user.email}&vendor_status=sold`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  /* ================== CALCULATIONS ================== */
  const totalRevenue = revenueOverview.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const totalSold = revenueOverview.length;

  // Count unique tickets added by vendor
  const totalAdded = new Set(revenueOverview.map((item) => item.ticketId)).size;

  /* ================== CHART DATA ================== */

  // 1. Simple Bar Chart Data (Absolute Values)
  const absoluteBarData = [
    { name: "Revenue (Tk)", value: totalRevenue, color: "#4F46E5" },
    { name: "Sold Tickets", value: totalSold, color: "#10B981" },
    { name: "Added Tickets", value: totalAdded, color: "#F59E0B" },
  ];

  // 2. Donut Chart Data (Tickets Sold vs. Added)
  const donutData = [
    { name: "Tickets Sold", value: totalSold },
    { name: "Tickets Remaining/Unsold", value: totalAdded - totalSold },
  ].filter((item) => item.value > 0); // Filter out negative/zero if data is inconsistent

  const DONUT_COLORS = ["#10B981", "#EF4444"]; // Green for Sold, Red for Remaining

  /* ================== CUSTOM TOOLTIP FOR BAR CHART ================== */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Custom format for Revenue (Taka)
      if (label === "Revenue (Tk)") {
        return (
          <div className="bg-white p-2 border border-gray-300 rounded shadow-md text-sm">
            <p className="font-semibold text-gray-700">{label}</p>
            <p style={{ color: payload[0].color }}>
              Value: ৳{payload[0].value.toLocaleString()}
            </p>
          </div>
        );
      }
      // Custom format for Sold/Added Tickets (Count)
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md text-sm">
          <p className="font-semibold text-gray-700">{label}</p>
          <p style={{ color: payload[0].color }}>
            Count: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  /* ================== CUSTOM TOOLTIP FOR DONUT CHART ================== */
  const DonutCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md text-sm">
          <p className="font-semibold text-gray-700">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.fill }}>
            Tickets: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* ===================== STAT CARDS (Keep as is) ===================== */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#4F46E5] to-[#6366F1]">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            ৳{totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Tickets Sold */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#10B981] to-[#34D399]">
          <h2 className="text-xl font-semibold">Tickets Sold</h2>
          <p className="text-3xl font-bold mt-2">
            {totalSold.toLocaleString()}
          </p>
        </div>

        {/* Tickets Added */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]">
          <h2 className="text-xl font-semibold">Tickets Added</h2>
          <p className="text-3xl font-bold mt-2">
            {totalAdded.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ===================== NEW CHARTS SECTION ===================== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar Chart (Absolute Values) */}
        <div className="p-6 bg-white rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Key Metrics Comparison
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={absoluteBarData}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis allowDecimals={false} stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {absoluteBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart (Sold vs. Remaining) */}
        <div className="p-6 bg-white rounded-2xl shadow-xl flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Sold vs. Remaining Tickets
          </h2>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80} // Creates the donut effect
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={5}
                  labelLine={false}
                  // Optional: Add simple label inside the Donut hole
                  // label={({ cx, cy, percent }) => (<text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="bold">{`${(percent * 100).toFixed(0)}%`}</text>)}
                >
                  {donutData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
                <Tooltip content={<DonutCustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
