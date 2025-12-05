import React from "react";
import NavBar from "../pages/Shared/NavBar/NavBar";
import { Outlet } from "react-router";
// import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    // bg-gray-100
    <div className="">
      <div className=" sticky top-0 z-50">
        {" "}
        <div className="max-w-7xl mx-auto">
          {/* Full width navbar */}
          <NavBar />
        </div>
      </div>

      {/* Centered main content */}
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Full width footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;