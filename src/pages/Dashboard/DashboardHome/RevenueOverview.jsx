import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
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

  /* ================== PIE CHART DATA ================== */
  const pieData = [
    { name: "Revenue", value: totalRevenue },
    { name: "Tickets Sold", value: totalSold },
  ];

  const COLORS = ["#667eea", "#764ba2", "#a18cd1"];

  /* ================== NORMALIZED BAR CHART ================== */
  const maxValue = Math.max(totalRevenue, totalSold, totalAdded);

  const barData = [
    {
      name: "Revenue",
      value: (totalRevenue / maxValue) * 100,
      realValue: totalRevenue,
    },
    {
      name: "Sold",
      value: (totalSold / maxValue) * 100,
      realValue: totalSold,
    },
    {
      name: "Added",
      value: (totalAdded / maxValue) * 100,
      realValue: totalAdded,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* ===================== STAT CARDS ===================== */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#667eea] to-[#764ba2]">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2">৳{totalRevenue}</p>
        </div>

        {/* Tickets Sold */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#667eea] to-[#764ba2]">
          <h2 className="text-xl font-semibold">Tickets Sold</h2>
          <p className="text-3xl font-bold mt-2">{totalSold}</p>
        </div>

        {/* Tickets Added */}
        <div className="p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-[#667eea] to-[#764ba2]">
          <h2 className="text-xl font-semibold">Tickets Added</h2>
          <p className="text-3xl font-bold mt-2">{totalAdded}</p>
        </div>
      </div>

      {/* ===================== CHARTS SECTION ===================== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="p-6 bg-base-100 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Overview Pie Chart</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="p-6 bg-base-100 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Statistics Bar Chart</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />

              <Tooltip
                formatter={(value, name, props) => [
                  props.payload.realValue,
                  name,
                ]}
              />

              <Bar dataKey="value" fill="#667eea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
