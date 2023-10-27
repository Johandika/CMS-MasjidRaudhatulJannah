import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setTabsValue } from "../../store/action/tabs";

import {
  Space,
  Table,
  Tag,
  Input,
  Tabs,
  Button,
  Select,
  Tooltip,
  InputNumber,
  Menu,
  Dropdown,
  message,
} from "antd";

import {
  PlusOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

import { getAllKelasTahsinDewasa } from "../../store/action/kelasTahsin";

const ColumsKelasDewasa = [
  {
    title: "Kelas",
    align: "center",
    render: (data) => {
      return data.kelas;
    },
  },
  {
    title: "Pengajar",
    align: "center",
    render: (data) => {
      return data.PengajarTahsin.nama;
    },
  },
  {
    title: "Hari",
    align: "center",
    render: (data) => {
      return data.Jadwal.hari;
    },
  },
  {
    title: "Catatan",
    align: "center",
    render: (data) => {
      return data.catatan;
    },
  },
  {
    title: "Kuota",
    align: "center",
    render: (data) => {
      return data.kuota;
    },
  },
  {
    title: "Status Aktif",
    align: "center",
    render: (data) => {
      if (data.status_aktif == true) {
        return <Tag color="success">Aktif</Tag>;
      } else {
        return <Tag color="error">Tidak Aktif</Tag>;
      }
    },
  },
];

const TabKelasTahsinDewasa = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const { KelasTahsinDewasas, KelasTahsinAnaks, KelasTahsinAnak } = useSelector(
    (state) => state.KelasTahsinReducer
  );
  const { Pengajars, Pengajar } = useSelector((state) => state.PengajarReducer);

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  return (
    <div>
      {TabsValues == "TambahKelasDewasa" ? (
        <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex gap-2 items-center">
            <ArrowLeftOutlined
              className=" text-[20px]"
              onClick={() => {
                handleChangeTabs("");
              }}
            />
            <p className="font-semibold text-[16px]">Tambah kelas dewasa</p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="kelasDewasa">Nama Kelas</label>
              <Input
                className=""
                id="kelasDewasa"
                size="large"
                placeholder="Masukkan Nama Kelas Tahsin Dewasa"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="pengajarTahsinAnak">Pengajar Tahsin</label>
              {Pengajars && Pengajars?.data?.length > 0 ? (
                <Select
                  id="pengajarTahsinAnak"
                  size="large"
                  placeholder="Pilih Pengajar Tahsin"
                  onChange={(value) => setPengajarKelasAnak(value)}
                >
                  {Pengajars?.data.map((pengajar) => (
                    <Option key={pengajar?.id} value={pengajar?.id}>
                      {pengajar?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Pengajar Tahsin Belum Ada</div>
              )}
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="catatanKelasDewasa">Catatan</label>
              <Input.TextArea
                className=""
                id="catatanKelasDewasa"
                size="large"
                placeholder="Masukkan Catatan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="kuotaKelasDewasa">Kuota Kelas Tahsin</label>
              <Input
                className=""
                id="kuotaKelasDewasa"
                size="large"
                placeholder="Masukkan Kuota Kelas Tahsin"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => {
                handleChangeTabs("");
              }}
              type="default"
              className="text-primaryDark border-primaryDark"
            >
              Batal
            </Button>
            <Button
              type="primary"
              className="bg-primaryDark"
              onClick={console.log("wdjidm")}
            >
              Simpan
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <Search
              placeholder="Masukkan Nama / Telepon"
              size="large"
              style={{
                width: 400,
              }}
            />

            <Tooltip placement="top" title={"Tambahkan Kelas Tahsin Dewasa"}>
              <Button
                onClick={() => {
                  handleChangeTabs("TambahKelasDewasa");
                }}
                size="large"
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
              >
                Kelas Dewasa
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsKelasDewasa}
              dataSource={KelasTahsinDewasas.data}
              pagination={false}
              scroll={{
                y: 480,
              }}
              rowKey={KelasTahsinDewasas.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabKelasTahsinDewasa;
