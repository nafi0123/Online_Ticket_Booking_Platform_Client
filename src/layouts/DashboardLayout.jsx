import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import { useNavigation } from "react-router";
import {
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaMoneyBillWave,
  FaPlus,
  FaClipboardList,
  FaHandPaper,
  FaCogs,
  FaUsers,
} from "react-icons/fa";
import Loading from "../pages/Loading/Loading";

const DashboardLayout = () => {
  const { role } = useRole();
  const { state } = useNavigation();

  // 👉 Theme Load + Apply From LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar - Fixed at z-50 */}
        <div className="navbar bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">
          
          {/* Navbar Left Side (Toggle Button and Logo) */}
          <div className="flex-1 flex items-center">
            {/* Mobile Drawer Toggle Button */}
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            {/* TB Logo with spacing */}
            <NavLink to="/" className="flex items-center gap-3 ml-2">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-2xl">
                <span className="text-white font-black text-2xl">TB</span>
              </div>

              <span className="text-3xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent hidden sm:block">
                TicketBari
              </span>
            </NavLink>
          </div>

          {/* Navbar Right Side */}
          <div className="flex-none">
            <div className="text-lg font-bold text-base-content hidden sm:block mr-4">
              Dashboard
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-base-200 p-6 md:p-10 min-h-screen">
          {state === "loading" ? <Loading /> : <Outlet />}
        </div>
      </div>

      {/* Sidebar - Increased z-index for better visibility */}
      {/* 🔴 FIX: Added z-50 to drawer-side */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        {/* 🔴 FIX: Increased z-index of aside element to match/exceed navbar */}
        <aside className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col shadow-2xl z-50">
          {/* Sidebar Header */}
          <div className="p-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white ">
            <h2 className="text-2xl font-extrabold tracking-tight">
              My Dashboard
            </h2>
            <p className="text-sm opacity-90 mt-1">
              Manage everything in one place
            </p>
          </div>

          {/* Menu */}
          <ul className="menu p-4 space-y-3 flex-1">
            {/* Common */}

            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                    : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                }
              >
                Dashboard Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                end
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                    : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                }
              >
                <FaUser /> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                    : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                }
              >
                <FaTicketAlt /> My Bookings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                    : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                }
              >
                <FaHistory /> Payment History
              </NavLink>
            </li>

            {/* Vendor */}
            {role === "vendor" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-ticket"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
                    <FaPlus /> Add New Ticket
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-added-tickets"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
                    <FaClipboardList /> My Added Tickets
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/requested-bookings"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
                    <FaHandPaper /> Requested Bookings
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/revenue-overview"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
                    <FaMoneyBillWave /> Revenue Overview
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-tickets"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
                    <FaCogs /> Manage Tickets
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/advertise-tickets"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
                    <FaMoneyBillWave /> Advertise Tickets
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
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