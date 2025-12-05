import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user: currentUser, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogOut = () => logOut().catch((err) => console.log(err));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ FIXED — You removed these accidentally
  const userName = currentUser?.displayName || "User";
  const userPhoto =
    currentUser?.photoURL || "https://i.ibb.co/S3kP3w8/default-avatar.png";

  return (
    <div
      className={`navbar sticky top-0 z-50 px-4 md:px-8 gap-2 
     
    `}
    >
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/61/61088.png"
          alt="bus"
          className="w-7 h-7"
        />

        <NavLink
          to="/"
          className={`text-2xl font-bold transition ${
            theme === "dark" ? "text-white" : "text-[#212529]"
          }`}
        >
          TicketBari
        </NavLink>
      </div>

      {/* CENTER - NAV ITEMS */}
      <div className="hidden md:flex items-center gap-10 font-semibold mx-auto">
        <NavLink
          to="/"
          className="hover:text-[#212529] dark:hover:text-white transition-all"
        >
          Home
        </NavLink>

        {currentUser && (
          <>
            <NavLink
              to="/tickets"
              className="hover:text-[#212529] dark:hover:text-white transition-all"
            >
              All Tickets
            </NavLink>

            <NavLink
              to="/dashboard"
              className="hover:text-[#212529] dark:hover:text-white transition-all"
            >
              Dashboard
            </NavLink>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* THEME SWITCH */}
        <input
          type="checkbox"
          className="toggle dark:border-gray-700"
          onChange={(e) => handleTheme(e.target.checked)}
          defaultChecked={theme === "dark"}
        />

        {currentUser ? (
          // LOGGED IN
          <div className="flex items-center gap-3">
            <span className="font-semibold hidden md:block">{userName}</span>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full">
                  <img src={userPhoto} alt="user" />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content  mt-3 z-[1] w-40 p-2 shadow bg-base-100 rounded-box">
                <li>
                  <NavLink
                    className="btn btn-sm bg-[#dbe2fb] text-black border-none hover:bg-[#c7d0f4]"
                    to="/profile"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="btn btn-sm border-none mt-3 text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                    onClick={handleLogOut}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // NOT LOGGED IN
          <div className="hidden md:flex gap-3">
            <NavLink
              to="/login"
              className="btn btn-sm bg-[#dbe2fb] text-black border-none hover:bg-[#c7d0f4]"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="btn btn-sm border-none text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
            >
              Register
            </NavLink>
          </div>
        )}

        {/* MOBILE MENU */}
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            {currentUser && (
              <>
                <li>
                  <NavLink to="/tickets">All Tickets</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              </>
            )}

            {!currentUser && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
