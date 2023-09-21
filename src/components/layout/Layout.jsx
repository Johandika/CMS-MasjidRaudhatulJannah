import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[20%] h-screen bg-primaryDark">
        <Navbar />
      </div>
      <div className="w-[80%] h-screen bg-slate-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
