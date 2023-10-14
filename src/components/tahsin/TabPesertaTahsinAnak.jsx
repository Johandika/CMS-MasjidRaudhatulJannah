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

const ColumsPesertAnak = [
  {
    title: "Nama Anak",
    align: "center",
    render: (data) => {
      return data.nama_anak;
    },
  },
  {
    title: "Nama Ayah",
    align: "center",
    render: (data) => {
      return data.nama_ayah;
    },
  },
  {
    title: "Nama Ibu",
    align: "center",
    render: (data) => {
      return data.nama_ibu;
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
    title: "Kelas",
    align: "center",
    render: (data) => {
      return data.KelasTahsinAnak.kelas;
    },
  },
  {
    title: "Baca Quran",
    align: "center",
    render: (data) => {
      if (data.baca_quran == true) {
        return "Bisa";
      } else {
        return "Belum Bisa";
      }
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

const TabPesertaTahsinAnak = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const {
    PesertaTahsinAnaks,
    PesertaTahsinAnak,
    PesertaTahsinDewasa,
    PesertaTahsinDewasas,
  } = useSelector((state) => state.PesertaTahsinReducer);

  useEffect(() => {
    dispatch(getAllPesertaTahsinAnak());
    dispatch(getAllPesertaTahsinDewasa());
  }, [TabsValues]);

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  return (
    <div>
      {TabsValues == "TambahPesertaAnak" ? (
        <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex gap-2 items-center">
            <ArrowLeftOutlined
              className=" text-[20px]"
              onClick={() => {
                handleChangeTabs("");
              }}
            />
            <p className="font-semibold text-[16px]">Tambah Peserta Anak</p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaAyahAnak">Nama Ayah</label>
              <Input
                className=""
                id="namaAyahAnak"
                size="large"
                placeholder="Masukkan Nama Ayah"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="namaIbuAnak">Nama Ibu</label>
              <Input
                className=""
                id="namaIbuAnak"
                size="large"
                placeholder="Masukkan Nama Ibu"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="namaAnak">Nama Anak</label>
              <Input
                className=""
                id="namaAnak"
                size="large"
                placeholder="Masukkan Nama Anak"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="umurAnak">Umur Anak</label>
              <Input
                className=""
                id="umurAnak"
                size="large"
                placeholder="Masukkan Umur Anak"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPesertaAnak">Telepon</label>
              <Input
                className=""
                id="teleponPesertaAnak"
                size="large"
                placeholder="Masukkan Telepon"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="kelasTahsinAnak">Kelas Tahsin Anak</label>
              <Input
                className=""
                id="kelasTahsinAnak"
                size="large"
                placeholder="Masukkan Kelas Tahsin Anak"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="alamatPesertaAnak">Alamat</label>
              <Input.TextArea
                className=""
                id="alamatPesertaAnak"
                size="large"
                placeholder="Masukkan Alamat"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="bisaBacaQuran">Bisa Baca Al-Quran</label>
              <Input
                className=""
                id="bisaBacaQuran"
                size="large"
                placeholder="Apakah Bisa Baca Al-Quran"
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

            <Tooltip placement="top" title={"Tambahkan Peserta Tahsin Anak"}>
              <Button
                onClick={() => {
                  handleChangeTabs("TambahPesertaAnak");
                }}
                size="large"
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
              >
                Peserta Anak
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsPesertAnak}
              dataSource={PesertaTahsinAnaks.data}
              pagination={false}
              scroll={{
                y: 400,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPesertaTahsinAnak;
