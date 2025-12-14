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
    { name: "Revenue (Tk)", value: totalRevenue, color: "#9333ea" }, // Purple
    { name: "Sold Tickets", value: totalSold, color: "#34d399" }, // Teal
    { name: "Added Tickets", value: totalAdded, color: "#fbbf24" }, // Amber
  ];

  // 2. Donut Chart Data (Tickets Sold vs. Added)
  const donutData = [
    { name: "Tickets Sold", value: totalSold },
    { name: "Tickets Remaining/Unsold", value: totalAdded - totalSold },
  ].filter((item) => item.value > 0);

  const DONUT_COLORS = ["#34d399", "#f87171"]; // Teal for Sold, Red for Remaining

  // Recharts configuration for Light/Dark Mode
  // Light Mode Defaults:
  const chartStrokeColorLight = "#6B7280"; // Gray-500
  const chartTextColorLight = "#1F2937"; // Gray-800

  // Note: For true dark mode support, we must ensure Recharts axis/tick colors are readable in dark background.
  // Since we cannot detect the system mode in this file without Context, we use the Light/Dark classes in the surrounding div and rely on default colors for Light mode.

  /* ================== CUSTOM TOOLTIP FOR BAR CHART (Light/Dark Mode Styled) ================== */
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Custom format for Revenue (Taka)
      const value = payload[0].value.toLocaleString();
      const unit = label === "Revenue (Tk)" ? `৳${value}` : value;

      return (
        <div className="p-2 border rounded-lg shadow-xl text-sm bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <p className="font-semibold dark:text-gray-200">{label}</p>
          <p style={{ color: payload[0].color }}>
            {label === "Revenue (Tk)" ? "Value: " : "Count: "}
            **{unit}**
          </p>
        </div>
      );
    }
    return null;
  };

  /* ================== CUSTOM TOOLTIP FOR DONUT CHART (Light/Dark Mode Styled) ================== */
  const DonutCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 border rounded-lg shadow-xl text-sm bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <p className="font-semibold dark:text-gray-200">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.fill }}>
            Tickets: **{payload[0].value.toLocaleString()}**
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    // Default Light Mode BG (bg-white/bg-gray-50) and Text (text-gray-800). Dark Mode BG (dark:bg-gray-900) and Text (dark:text-gray-200)
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="text-3xl font-bold border-b border-gray-200 pb-4 text-gray-800 dark:border-gray-700 dark:text-white">
        💰 Vendor Revenue Overview
      </h1>

      {/* ===================== STAT CARDS (Card colors remain bright) ===================== */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#9333ea] to-[#a855f7]">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            ৳{totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Tickets Sold */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#34d399] to-[#6ee7b7]">
          <h2 className="text-xl font-semibold">Tickets Sold</h2>
          <p className="text-3xl font-bold mt-2">
            {totalSold.toLocaleString()}
          </p>
        </div>

        {/* Tickets Added */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#fbbf24] to-[#fcd34d]">
          <h2 className="text-xl font-semibold">Tickets Added</h2>
          <p className="text-3xl font-bold mt-2">
            {totalAdded.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ===================== NEW CHARTS SECTION ===================== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar Chart (Absolute Values) */}
        {/* Default Light Mode BG (bg-white). Dark Mode BG (dark:bg-gray-800) */}
        <div className="p-6 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Key Metrics Comparison
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={absoluteBarData}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              {/* Axes/Ticks: Use Light Mode colors as default */}
              <XAxis
                dataKey="name"
                stroke={chartStrokeColorLight}
                tick={{ fill: chartTextColorLight }}
              />
              <YAxis
                allowDecimals={false}
                stroke={chartStrokeColorLight}
                tick={{ fill: chartTextColorLight }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {absoluteBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart (Sold vs. Remaining) */}
        {/* Default Light Mode BG (bg-white). Dark Mode BG (dark:bg-gray-800) */}
        <div className="p-6 bg-white rounded-2xl shadow-xl flex flex-col dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Sold vs. Remaining Tickets
          </h2>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={5}
                  labelLine={false}
                >
                  {donutData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                    />
                  ))}
                </Pie>
                {/* Legend text color changes via wrapperStyle. Use Light Mode color as default. */}
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ color: chartTextColorLight }}
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
