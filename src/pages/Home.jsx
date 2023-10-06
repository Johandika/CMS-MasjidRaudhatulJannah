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
    <div>
      <Input
        style={{ width: "200px" }}
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button onClick={handleChangeTabs}>Change Tab</button>
      <p>{Tabs}</p>
    </div>
  );
};

export default Home;
