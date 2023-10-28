import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setTabsValue } from "../store/action/tabs";
import { Input } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const { Tabs } = useSelector((state) => state.TabsReducer);

  const [data, setData] = useState("");

  const handleChangeTabs = () => {
    dispatch(setTabsValue(data));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <p>COMING SOON</p>
    </div>
  );
};

export default Home;
