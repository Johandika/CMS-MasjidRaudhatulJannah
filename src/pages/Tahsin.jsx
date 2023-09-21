import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPengajar } from "../store/action/pengajar";

const Kajian = () => {
  const dispatch = useDispatch();
  const { Pengajars } = useSelector((state) => state.PengajarReducer);
  useEffect(() => {
    dispatch(fetchPengajar());
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
            label: "Pengajar",
            key: "1",
            children: (
              <div>
                <p>Pengajar</p>
              </div>
            ),
          },
          {
            label: "Kelas Anak",
            key: "2",
            children: (
              <div>
                <p>Peserta Anak</p>
              </div>
            ),
          },
          {
            label: "Kelas  Dewasa",
            key: "3",
            children: (
              <div>
                <p>Tahsin Dewasa</p>
              </div>
            ),
          },
          {
            label: "Peserta Anak",
            key: "4",
            children: (
              <div>
                <p>Peserta Anak</p>
              </div>
            ),
          },
          {
            label: "Peserta Dewasa",
            key: "5",
            children: (
              <div>
                <p>Peserta Dewasa</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Kajian;
