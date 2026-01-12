import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigation } from "react-router";
import useRole from "../hooks/useRole";
import {
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaPlus,
  FaClipboardList,
  FaHandPaper,
  FaCogs,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import Loading from "../pages/Loading/Loading";

const activeClass =
  "flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold shadow-lg";
const normalClass =
  "flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-base-200 transition-all";

const DashboardLayout = () => {
  const { role } = useRole();
  const { state } = useNavigation();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
          <div className="navbar  px-8 md:px-6 lg:px-12">
            <div className="flex-1 flex items-center gap-3">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                ☰
              </label>

              <NavLink to="/" className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-xl">
                  <span className="text-white text-xl font-black">TB</span>
                </div>
                <span className="hidden sm:block text-2xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                  TicketBari
                </span>
              </NavLink>
            </div>

            <div className=" font-bold text-lg pr-2">
              Dashboard
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-base-200 p-4 md:p-8">
          {state === "loading" ? <Loading /> : <Outlet />}
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 bg-base-100 border-r border-base-300 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
            <h2 className="text-2xl font-extrabold">My Dashboard</h2>
            <p className="text-sm opacity-90">Manage everything easily</p>
          </div>

          {/* Menu */}
          <ul className="p-4 space-y-2 flex-1">
            {/* Common */}
            <li>
              <NavLink to="/dashboard" end className={({ isActive }) => isActive ? activeClass : normalClass}>
                Dashboard Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaUser /> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/my-bookings" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaTicketAlt /> My Bookings
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/payment-history" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaHistory /> Payment History
              </NavLink>
            </li>

            {/* Vendor */}
            {role === "vendor" && (
              <>
                <li>
                  <NavLink to="/dashboard/add-ticket" className={({ isActive }) => isActive ? activeClass : normalClass}>
                    <FaPlus /> Add Ticket
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/my-added-tickets" className={({ isActive }) => isActive ? activeClass : normalClass}>
                    <FaClipboardList /> My Tickets
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/requested-bookings" className={({ isActive }) => isActive ? activeClass : normalClass}>
                    <FaHandPaper /> Requested Bookings
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/manage-tickets" className={({ isActive }) => isActive ? activeClass : normalClass}>
                    <FaCogs /> Manage Tickets
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/advertise-tickets" className={({ isActive }) => isActive ? activeClass : normalClass}>
                    <FaMoneyBillWave /> Advertise Tickets
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/user-management" className={({ isActive }) => isActive ? activeClass : normalClass}>
                    <FaUsers /> User Management
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
