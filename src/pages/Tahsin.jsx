import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTabsValue } from "../store/action/tabs";

import TabPengajar from "../components/tahsin/TabPengajar";
import TabKelasTahsinAnak from "../components/tahsin/TabKelasTahsinAnak";
import TabKelasTahsinDewasa from "../components/tahsin/TabKelasTahsinDewasa";
import TabPesertaTahsinAnak from "../components/tahsin/TabPesertaTahsinAnak";
import TabPesertaTahsinDewasa from "../components/tahsin/TabPesertaTahsinDewasa";

import { Tabs } from "antd";

const Kajian = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  return (
    <div className="w-full h-full px-5">
      <Tabs
        className=""
        type="line"
        defaultActiveKey="1"
        items={[
          {
            label: "Pengajar",
            key: "1",
            children: <TabPengajar />,
          },
          {
            label: "Kelas Anak",
            key: "2",
            children: <TabKelasTahsinAnak />,
          },
          {
            label: "Kelas Dewasa",
            key: "3",
            children: <TabKelasTahsinDewasa />,
          },
          {
            label: "Peserta Anak",
            key: "4",
            children: <TabPesertaTahsinAnak />,
          },
          {
            label: "Peserta Dewasa",
            key: "5",
            children: <TabPesertaTahsinDewasa />,
          },
        ]}
      />
    </div>
  );
};

export default Kajian;
