import React, { useEffect, useState } from "react";
import NavBar from "../pages/Shared/NavBar/NavBar";
import { Outlet } from "react-router";

const RootLayout = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  return (
    <div>
      {/* NavBar Wrapper */}
      <div
        className={`
          sticky top-0 z-50 shadow-md 
          ${
            theme === "dark"
              ? "bg-[#1b1c1d] shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
              : " shadow"
          }
        `}
      >
        <div className="max-w-7xl mx-auto">
          <NavBar />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto z-1000">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
