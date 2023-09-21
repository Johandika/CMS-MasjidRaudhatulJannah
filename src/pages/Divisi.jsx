import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchDivisi } from "../store/action/divisi";

const Divisi = () => {
  const dispatch = useDispatch();

  const { Divisis } = useSelector((state) => state.DivisiReducer);

  useEffect(() => {
    dispatch(fetchDivisi());
  }, []);
  return (
    <div className="w-full h-full px-5">
      <Tabs
        className=""
        type="line"
        size="large"
        defaultActiveKey="1"
        items={[
          {
            label: "Divisi",
            key: "1",
            children: (
              <div>
                <p>Divisi</p>
              </div>
            ),
          },
          {
            label: "Kegiatan",
            key: "2",
            children: (
              <div>
                <p>Kegiatan</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Divisi;
