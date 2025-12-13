import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // আপনার হুকের পাথ চেক করে নিন
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading"; // আপনার Loading কম্পোনেন্টের পাথ চেক করে নিন
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";

/**
 * ইউজার ডেটা থেকে Admin, Vendor, Regular User, এবং Fraud User গণনা করার ফাংশন।
 */
const calculateUserStats = (users) => {
  let adminCount = 0;
  let vendorCount = 0;
  let regularUserCount = 0;
  let fraudCount = 0;

  users.forEach((user) => {
    // === রোল গণনা (Role Counting) ===
    if (user.role === "admin") {
      adminCount++;
    } else if (user.role === "vendor") {
      vendorCount++;
    } else {
      regularUserCount++;
    }
    
    // === ফ্রড গণনা (Fraud Counting) ===
    // এখানে user.isFraud বুলিয়ান ফিল্ডের উপর নির্ভর করা হচ্ছে।
    if (user.isFraud === true) {
      fraudCount++;
    }
  });

  return { adminCount, vendorCount, regularUserCount, fraudCount };
};

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["admin-users-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-home");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  /* ================== CALCULATIONS & CHART DATA ================== */
  const { adminCount, vendorCount, regularUserCount, fraudCount } =
    calculateUserStats(allUsers);
    
  const totalUsers = allUsers.length;

  // 1. Role Distribution Bar Chart Data
  const roleChartData = [
    { name: "Admins", value: adminCount, color: "#4F46E5" }, 
    { name: "Vendors", value: vendorCount, color: "#10B981" }, 
    { name: "Regular Users", value: regularUserCount, color: "#F59E0B" }, 
  ];

  // 2. Fraud Distribution Donut Chart Data
  const fraudChartData = [
    { name: "Non-Fraud Users", value: totalUsers - fraudCount },
    { name: "Fraud Users", value: fraudCount },
  ];
  const FRAUD_COLORS = ["#10B981", "#EF4444"]; // Green for Safe, Red for Fraud


  /* ================== CUSTOM TOOLTIPS ================== */
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-xl text-sm">
          <p className="font-semibold text-gray-700">{label}</p>
          <p style={{ color: payload[0].color }}>
            Total: **{payload[0].value.toLocaleString()}**
          </p>
        </div>
      );
    }
    return null;
  };
  
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-xl text-sm">
          <p className="font-semibold text-gray-700">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.fill }}>
            Count: **{payload[0].value.toLocaleString()}**
          </p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
        📊 Admin Dashboard Overview
      </h1>

      {/* ===================== STAT CARDS (Combined) ===================== */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Total Users (New Card) */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#0E7490] to-[#22D3EE] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-extrabold mt-2">{totalUsers}</p>
        </div>
        
        {/* Admins */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#4F46E5] to-[#6366F1] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Admins</h2>
          <p className="text-4xl font-extrabold mt-2">{adminCount}</p>
        </div>

        {/* Vendors */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#10B981] to-[#34D399] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Vendors</h2>
          <p className="text-4xl font-extrabold mt-2">{vendorCount}</p>
        </div>

        {/* Fraud Users (New Card) */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#EF4444] to-[#F87171] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Fraud Users</h2>
          <p className="text-4xl font-extrabold mt-2">{fraudCount}</p>
        </div>
      </div>

      {/* ===================== CHARTS SECTION (Role & Fraud) ===================== */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 1. Role Distribution Bar Chart */}
        <div className="p-6 bg-white rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            👥 User Role Distribution
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={roleChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis
                allowDecimals={false}
                stroke="#6B7280"
                label={{ value: "User Count", angle: -90, position: "insideLeft", fill: "#6B7280" }}
              />
              <Tooltip content={<CustomBarTooltip />} />

              <Bar dataKey="value" barSize={70} radius={[10, 10, 0, 0]}>
                {roleChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* 2. Fraud Distribution Donut Chart */}
        <div className="p-6 bg-white rounded-xl shadow-xl flex flex-col">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                ⚠️ Fraud Status
            </h2>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={fraudChartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={90}
                            outerRadius={120}
                            paddingAngle={5}
                            labelLine={false}
                        >
                            {fraudChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={FRAUD_COLORS[index % FRAUD_COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                        <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
        
      </div>

      <p className="text-sm text-gray-500 pt-4">
        *Note: All counts are derived from the '/admin-home' API data. Roles are based on the 'role' field, and Fraud status is based on the 'isFraud' field.
      </p>
    </div>
  );
};

export default AdminDashboardHome;