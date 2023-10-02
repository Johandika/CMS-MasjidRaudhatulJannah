import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Space, Table, Tag, Input, Tabs, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;

import { fetchRekening } from "../store/action/rekening";
import ubahFormatDate from "../components/utils/date";

const Rekening = () => {
  const dispatch = useDispatch();

  const { Rekenings } = useSelector((state) => state.RekeningReducer);

  useEffect(() => {
    dispatch(fetchRekening());
  }, []);

  const ColumsPengajar = [
    {
      title: "Nama",
      render: (data) => {
        return data.atas_nama;
      },
    },
    {
      width: 200,
      title: "Nomor Rekening",
      render: (data) => {
        return data.nomor_rekening;
      },
    },
    {
      width: 200,
      title: "Saldo",
      render: (data) => {
        return `Rp.${data.saldo}`;
      },
    },
    {
      width: 250,
      title: "Terakhir Update",
      render: (data) => {
        return ubahFormatDate(data.updatedAt);
      },
    },
    {
      width: 200,
      title: "action",
      render: (data) => {
        return ubahFormatDate(data.updatedAt);
      },
    },
  ];

  return (
    <div className="w-full p-5">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-between">
          <Search
            placeholder="Masukkan Nama / Telepon"
            // onSearch={onSearch}
            size="large"
            style={{
              width: 400,
            }}
          />

          <Tooltip placement="top" title={"Tambahkan Rekening Donasi"}>
            <Button
              size="large"
              icon={<PlusOutlined />}
              className="bg-primaryLight text-white"
            >
              Rekening
            </Button>
          </Tooltip>
        </div>
        <div>
          <Table
            columns={ColumsPengajar}
            dataSource={Rekenings.data}
            pagination={false}
            scroll={{
              y: 440,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Rekening;
