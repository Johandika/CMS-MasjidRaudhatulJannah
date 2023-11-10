import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import {
  HomeOutlined,
  PieChartOutlined,
  UserSwitchOutlined,
  BookOutlined,
  FunnelPlotOutlined,
  TeamOutlined,
  IdcardOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  FallOutlined,
  CarryOutOutlined,
  StockOutlined,
  RiseOutlined,
  ReadOutlined,
  AreaChartOutlined,
  ReconciliationOutlined,
  ClusterOutlined,
  AppstoreAddOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

export const dataSidebar = [
  {
    name: "Dasboard",
    icon: <AreaChartOutlined />,
    link: "/",
  },
  {
    name: "Tahsin",
    icon: <ReadOutlined />,
    link: "/tahsin",
  },
  {
    name: "Kajian",
    icon: <ReconciliationOutlined />,
    link: "/kajian",
  },
  {
    name: "Divisi",
    icon: <ClusterOutlined />,
    link: "/divisi",
  },
  {
    name: "Rekening",
    icon: <BookOutlined />,
    link: "/rekening",
  },
  {
    name: "Diklat",
    icon: <AppstoreAddOutlined />,
    link: "/diklat",
  },
  {
    name: "Layanan",
    icon: <ContactsOutlined />,
    link: "/layanan",
  },
  {
    name: "Keluar",
    icon: <LogoutOutlined />,
    link: "/",
  },
];

const dataMenu = [dataSidebar.pop()];

const Sidebar = () => {
  const navigate = useNavigate();
  const activeMenu = localStorage.getItem("activeMenu") || dataSidebar[0].name;

  return (
    <div className="w-full h-screen bg-primaryLight px-5  flex flex-col">
      {/* Logo */}
      <div className="flex  items-center  h-[75px] ">
        <p className="font-black font-poppins text-xl text-white">
          Raudhatul Jannah
        </p>
      </div>

      {/* Menu */}
      <div className="h-[80%]">
        {dataSidebar &&
          dataSidebar?.map((el, index) => (
            <Link
              to={el.link}
              key={index}
              className={`text-white text-md font-poppins px-3 py-2 cursor-pointer flex items-center gap-3 mb-1 ${
                activeMenu === el.name
                  ? "bg-primaryDark rounded-lg font-semibold "
                  : "hover:bg-primary hover:rounded-lg"
              }`}
              onClick={() => {
                localStorage.setItem("activeMenu", el.name);
              }}
            >
              {el.icon}
              {el.name}
            </Link>
          ))}
      </div>
      <div className="">
        {dataMenu &&
          dataMenu?.map((el, index) => {
            return (
              <div
                key={index}
                className="text-white text-md  font-poppins px-3 py-2 cursor-pointer hover:bg-primaryDark hover:rounded-lg  flex items-center gap-3 "
                onClick={() => {
                  message.loading("Loading...", 1, () => {
                    localStorage.clear();
                    localStorage.setItem("activeMenu", "Dasboard");
                    message.success("Sampai Jumpa Lagi!!");
                    navigate("/login");
                  });
                }}
              >
                {el.icon}
                {el.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
