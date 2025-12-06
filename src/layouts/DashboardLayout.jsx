import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <div className="flex-1 px-4">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-2xl">
                <span className="text-white font-black text-2xl">TB</span>
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent hidden sm:block">
                TicketBari
              </span>
            </NavLink>
          </div>

          <div className="flex-none">
            <div className="text-lg font-bold text-base-content">Dashboard</div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-base-200 p-6 md:p-10 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col shadow-2xl">
          {/* Sidebar Header */}
          <div className="p-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
            <h2 className="text-2xl font-extrabold tracking-tight">My Dashboard</h2>
            <p className="text-sm opacity-90 mt-1">Manage everything in one place</p>
          </div>

          {/* Menu */}
          <ul className="menu p-4 space-y-3 flex-1">
            {/* Common Links */}
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard Home</span>
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>My Bookings</span>
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Payment History</span>
              </NavLink>
            </li>

            {/* Vendor Only */}
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add New Ticket</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-Added-Tickets"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                        : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                    }
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v8m-4-4h8" />
                    </svg>
                    <span>My Added Tickets</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Only */}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/manage-tickets"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                      : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                  }
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 12h-1.25m-3.75 0h-1.25m-3.75 0h-1.25m-3.75 0H4" />
                  </svg>
                  <span>Manage Tickets</span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                    : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>My Profile</span>
              </NavLink>
            </li>
          </ul>

          {/* Logout */}
          <div className="p-4 border-t border-base-300">
            <button className="btn btn-outline btn-error btn-sm w-full font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;