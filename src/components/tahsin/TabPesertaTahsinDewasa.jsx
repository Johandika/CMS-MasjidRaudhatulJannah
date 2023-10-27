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

import {
  getAllPesertaTahsinAnak,
  getAllPesertaTahsinDewasa,
} from "../../store/action/pesertaTahsin";

const TabPesertaTahsinDewasa = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const {
    PesertaTahsinAnaks,
    PesertaTahsinAnak,
    PesertaTahsinDewasa,
    PesertaTahsinDewasas,
  } = useSelector((state) => state.PesertaTahsinReducer);

  const ColumsPesertaDewasa = [
    {
      title: "Nama",
      align: "center",
      render: (data) => {
        return data.nama;
      },
    },
    {
      title: "Telepon",
      align: "center",
      render: (data) => {
        return data.telepon;
      },
    },
    {
      title: "Alamat",
      align: "center",
      render: (data) => {
        return data.alamat;
      },
    },
    {
      title: "Pekerjaan",
      align: "center",
      render: (data) => {
        return data.pekerjaan;
      },
    },
    {
      title: "Umur",
      align: "center",
      render: (data) => {
        return `${data.umur} Tahun`;
      },
    },
    {
      title: "Kelas",
      align: "center",
      render: (data) => {
        return data.KelasTahsinDewasa.kelas;
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

  useEffect(() => {
    dispatch(getAllPesertaTahsinAnak());
    dispatch(getAllPesertaTahsinDewasa());
  }, [TabsValues]);

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  return (
    <div>
      {TabsValues == "TambahPesertaDewasa" ? (
        <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex gap-2 items-center">
            <ArrowLeftOutlined
              className=" text-[20px]"
              onClick={() => {
                handleChangeTabs("");
              }}
            />
            <p className="font-semibold text-[16px]">Tambah Peserta Dewasa</p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaPesertaDewasa">Nama</label>
              <Input
                className=""
                id="namaPesertaDewasa"
                size="large"
                placeholder="Masukkan Nama"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="umurPesertaDewasa">Umur</label>
              <Input
                className=""
                id="umurPesertaDewasa"
                size="large"
                placeholder="Masukkan Umur"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="pekerjaanDewasa">Pekerjaan</label>
              <Input
                className=""
                id="pekerjaanDewasa"
                size="large"
                placeholder="Masukkan Pekerjaan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPesertaDewasa">Telepon</label>
              <Input
                className=""
                id="teleponPesertaDewasa"
                size="large"
                placeholder="Masukkan Telepon"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="alamatPesertaDewasa">Alamat</label>
              <Input.TextArea
                className=""
                id="alamatPesertaDewasa"
                size="large"
                placeholder="Masukkan Alamat"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="kelasTahsinDewasa">Kelas Tahsin Anak</label>
              <Input
                className=""
                id="kelasTahsinDewasa"
                size="large"
                placeholder="Masukkan Kelas Tahsin"
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
            <Button type="primary" className="bg-primaryDark">
              Simpan
            </Button>
          </div>
        </div>
      ) : (
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

            <Tooltip placement="top" title={"Tambahkan Peserta Tahsin Dewasa"}>
              <Button
                onClick={() => {
                  handleChangeTabs("TambahPesertaDewasa");
                }}
                size="large"
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
              >
                Peserta Dewasa
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsPesertaDewasa}
              dataSource={PesertaTahsinDewasas.data}
              pagination={false}
              scroll={{
                y: 400,
              }}
              rowKey={PesertaTahsinDewasas.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPesertaTahsinDewasa;
