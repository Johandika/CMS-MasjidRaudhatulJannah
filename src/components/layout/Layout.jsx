import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[20%] h-screen">
        <Sidebar />
      </div>
      <div className="w-[80%] h-screen bg-slate-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
