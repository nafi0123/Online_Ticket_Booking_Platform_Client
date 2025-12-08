import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user: currentUser, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");
  const handleLogOut = () => {
    logOut().catch((err) => console.log(err));
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const userName = currentUser?.displayName || "User";
  const userPhoto =
    currentUser?.photoURL || "https://i.ibb.co/S3kP3w8/default-avatar.png";

  // Common Nav Links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="font-semibold hover:text-[#667eea]"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      {currentUser && (
        <>
          <li>
            <NavLink
              to="/all-tickets"
              className="font-semibold hover:text-[#667eea]"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className="font-semibold hover:text-[#667eea]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/95 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="navbar-start">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-xl">TB</span>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent hidden sm:block">
            TicketBari
          </span>
        </NavLink>
      </div>

      {/* Desktop Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-8 text-base font-medium">{navLinks}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3">

        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={(e) => handleTheme(e.target.checked)} checked={theme === "dark"} />
          <svg className="swap-on fill-current w-7 h-7 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg className="swap-off fill-current w-7 h-7 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="hidden lg:block font-medium">Hi, {userName.split(" ")[0]}</span>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-11 rounded-full ring-4 ring-[#667eea] ring-offset-2 ring-offset-base-100">
                    <img src={userPhoto} alt="User" />
                  </div>
                </div>
                <ul className="menu dropdown-content mt-3 p-3 shadow-2xl bg-base-100 rounded-xl w-56 border">
                  <li><NavLink to="/profile" className="flex items-center gap-3">My Profile</NavLink></li>
                  <li><button onClick={handleLogOut} className="-600 font-medium bg-red-600 btn-sm text-white mt-2">Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink to="/login" className="btn btn-outline btn-sm">Login</NavLink>
              <NavLink to="/register" className="btn btn-sm bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">Register</NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-circle"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu - Fixed & Beautiful */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-2xl border-t border-gray-200 dark:border-gray-700 z-50">
          <ul className="menu p-4 space-y-2">
            {navLinks}

            <div className="divider my-4"></div>

            {/* Mobile Auth Section */}
            {currentUser ? (
              <div className="flex flex-col gap-4 pb-4">
                <div className="flex items-center gap-3 px-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-[#667eea] ring-offset-2">
                      <img src={userPhoto} alt="user" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{userName}</p>
                    <p className="text-sm text-gray-500">Welcome back!</p>
                  </div>
                </div>
                <NavLink
                  to="/profile"
                  className="btn btn-outline w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </NavLink>
                <button
                  onClick={handleLogOut}
                  className="btn bg-red-600 text-white w-full hover:bg-red-700 "
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pb-4 px-4">
                <NavLink
                  to="/login"
                  className="btn btn-outline w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;