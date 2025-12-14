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
  Legend,
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
    if (user.isFraud === true) {
      fraudCount++;
    }
  });

  return { adminCount, vendorCount, regularUserCount, fraudCount };
};

// Recharts configuration based on mode
// Note: We use static colors here, Tailwind's dark class is applied to the surrounding div
const chartStrokeColorLight = "#6B7280"; // Gray-500
const chartTextColorLight = "#1F2937"; // Gray-800
const chartStrokeColorDark = "#9ca3af"; // Gray-400
const chartTextColorDark = "#e5e7eb"; // Gray-200


const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isLoading,
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
    { name: "Admins", value: adminCount, color: "#9333ea" }, // Purple
    { name: "Vendors", value: vendorCount, color: "#34d399" }, // Teal
    { name: "Regular Users", value: regularUserCount, color: "#fbbf24" }, // Amber
  ];

  // 2. Fraud Distribution Donut Chart Data
  const fraudChartData = [
    { name: "Non-Fraud Users", value: totalUsers - fraudCount },
    { name: "Fraud Users", value: fraudCount },
  ];
  const FRAUD_COLORS = ["#34d399", "#f87171"]; // Teal for Safe, Red for Fraud


  /* ================== CUSTOM TOOLTIPS (Light/Dark Mode Styled) ================== */
  // NOTE: Tooltip uses dark: variants to handle styling automatically
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 border rounded-lg shadow-xl text-sm bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <p className="font-semibold dark:text-gray-200">{label}</p>
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
        <div className="p-3 border rounded-lg shadow-xl text-sm bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <p className="font-semibold dark:text-gray-200">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.fill }}>
            Count: **{payload[0].value.toLocaleString()}**
          </p>
        </div>
      );
    }
    return null;
  };


  // Function to determine Recharts colors based on mode (if available via context/state)
  // For simplicity, we are setting Recharts colors based on surrounding theme.
  const getRechartsColors = (isDarkMode) => {
      // Since we don't have direct access to the dark mode state, we will assume light mode for the chart properties, 
      // but ensure the surrounding divs handle the background color change.
      return {
          stroke: isDarkMode ? chartStrokeColorDark : chartStrokeColorLight,
          text: isDarkMode ? chartTextColorDark : chartTextColorLight,
      };
  };
  
  // We'll use static light colors for the axes stroke, 
  // and rely on surrounding div classes to handle the background/text color change.
  // NOTE: For true Recharts dark mode styling, you would need to pass the dark mode state (e.g., from a context) here.
  const { stroke: currentStroke, text: currentText } = getRechartsColors(false); // Assuming light mode for chart axes by default

  return (
    // Default Light Mode BG (bg-gray-50) and Text (text-gray-800). Dark Mode BG (dark:bg-gray-900) and Text (dark:text-gray-200)
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="text-3xl font-bold border-b border-gray-200 pb-4 text-gray-800 dark:border-gray-700 dark:text-white">
        📊 Admin Dashboard Overview
      </h1>

      {/* ===================== STAT CARDS (Combined) ===================== */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Total Users (Note: Card colors remain bright, independent of background mode) */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#0E7490] to-[#22D3EE] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-extrabold mt-2">{totalUsers}</p>
        </div>

        {/* Admins */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#9333ea] to-[#a855f7] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Admins</h2>
          <p className="text-4xl font-extrabold mt-2">{adminCount}</p>
        </div>

        {/* Vendors */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#34d399] to-[#6ee7b7] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Vendors</h2>
          <p className="text-4xl font-extrabold mt-2">{vendorCount}</p>
        </div>

        {/* Fraud Users (New Card) */}
        <div className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-[#ef4444] to-[#f87171] transition transform hover:scale-[1.02]">
          <h2 className="text-xl font-semibold">Fraud Users</h2>
          <p className="text-4xl font-extrabold mt-2">{fraudCount}</p>
        </div>
      </div>

      {/* ===================== CHARTS SECTION (Role & Fraud) ===================== */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 1. Role Distribution Bar Chart */}
        {/* Default Light Mode BG (bg-white). Dark Mode BG (dark:bg-gray-800) */}
        <div className="p-6 bg-white rounded-xl shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            👥 User Role Distribution
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            {/* Note: In a real app, you would dynamically change Recharts stroke/tick colors based on dark mode state. 
                Here we use light-mode friendly defaults and rely on the surrounding div's text color for tick/label fill. 
                Using the simplified logic here assumes the text color will be inherited for fill.
            */}
            <BarChart
              data={roleChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" stroke={chartStrokeColorLight} tick={{ fill: chartTextColorLight }} />
              <YAxis
                allowDecimals={false}
                stroke={chartStrokeColorLight}
                tick={{ fill: chartTextColorLight }}
                label={{ value: "User Count", angle: -90, position: "insideLeft", fill: chartTextColorLight }}
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
        {/* Default Light Mode BG (bg-white). Dark Mode BG (dark:bg-gray-800) */}
        <div className="p-6 bg-white rounded-xl shadow-xl flex flex-col dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
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
                        {/* Legend text color changes via wrapperStyle. We set the default light color here. */}
                        <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ color: chartTextColorLight }} />
                        <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

      </div>

      <p className="text-sm text-gray-500 pt-4 dark:text-gray-400">
        *Note: All counts are derived from the '/admin-home' API data. Roles are based on the 'role' field, and Fraud status is based on the 'isFraud' field.
      </p>
    </div>
  );
};

export default AdminDashboardHome;