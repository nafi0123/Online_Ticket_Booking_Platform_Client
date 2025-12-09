import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

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

        {/* Top Navbar */}
        <div className="navbar bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
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
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                    : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                }
              >
                My Bookings
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
                Payment History
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
                    Add New Ticket
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
                    My Added Tickets
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
                    Requested Bookings
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
                    Manage Tickets
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
                    Advertise Tickets
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
                    User Management
                  </NavLink>
                </li>
              </>
            )}

            {/* Profile */}
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-sm w-full justify-start bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-xl border-none font-bold hover:opacity-95"
                    : "btn btn-ghost btn-sm w-full justify-start text-base-content hover:bg-base-200"
                }
              >
                My Profile
              </NavLink>
            </li>
          </ul>

          {/* Logout */}
          <div className="p-4 border-t border-base-300">
            <button className="btn btn-outline btn-error btn-sm w-full font-bold">
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
