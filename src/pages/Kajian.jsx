import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchKajianRutin } from "../store/action/kajian";

const Kajian = () => {
  const dispatch = useDispatch();

  const { KajianRutins } = useSelector((state) => state.KajianReducer);

  useEffect(() => {
    dispatch(fetchKajianRutin());
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
            label: "Ustadz",
            key: "1",
            children: (
              <div>
                <p>Ustadz</p>
              </div>
            ),
          },
          {
            label: "Kategori Kajian",
            key: "2",
            children: (
              <div>
                <p>Kategori Kajian</p>
              </div>
            ),
          },
          {
            label: "Kategori Kajian",
            key: "3",
            children: (
              <div>
                <p>Kajian Rutin</p>
              </div>
            ),
          },
          {
            label: "Kajian Tematik",
            key: "4",
            children: (
              <div>
                <p>Kajian Tematik</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Kajian;
