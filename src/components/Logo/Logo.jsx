import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <div className="flex items-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/61/61088.png"
            alt="bus"
            className="w-7 h-7"
          />
          <h3 className="text-3xl font-bold -ms-2.5">zapShift</h3>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
