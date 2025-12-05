import React, { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider"; // if using context

const NavBar = () => {
  const user = false; // replace with real user context
  const userName = "Nafi"; // dynamic
  const userPhoto =
    "https://i.ibb.co/S3kP3w8/default-avatar.png"; // dynamic user photo

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4">
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2 flex-1">
        <img
          src="https://cdn-icons-png.flaticon.com/512/61/61088.png"
          alt="bus"
          className="w-7 h-7"
        />
        <a className="text-2xl font-bold text-[#212529]">TicketBari</a>
      </div>

      {/* MIDDLE (Desktop Menu) */}
      <div className="hidden md:flex gap-6 font-semibold">
        <a className="hover:text-[#212529]">Home</a>

        {user && (
          <>
            <a className="hover:text-[#212529]">All Tickets</a>
            <a className="hover:text-[#212529]">Dashboard</a>
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* IF USER LOGGED IN */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-semibold hidden md:block">{userName}</span>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar cursor-pointer"
              >
                <div className="w-10 rounded-full">
                  <img src={userPhoto} alt="user" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] w-40 p-2 shadow bg-base-100 rounded-box"
              >
                <li>
                  <a>My Profile</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // IF USER NOT LOGGED IN
          <div className="hidden md:flex gap-3">
            <a className="btn btn-sm bg-[#dbe2fb] text-black border-none hover:bg-[#bec8ed]">
              Login
            </a>
            <a className="btn btn-sm bg-[#212529] text-white border-none">
              Register
            </a>
          </div>
        )}

        {/* MOBILE MENU */}
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Home</a>
            </li>

            {user && (
              <>
                <li>
                  <a>All Tickets</a>
                </li>
                <li>
                  <a>Dashboard</a>
                </li>
              </>
            )}

            {!user && (
              <>
                <li>
                  <a>Login</a>
                </li>
                <li>
                  <a>Register</a>
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
