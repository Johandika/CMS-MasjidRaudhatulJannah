import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Space, Table, Tag, Input, Tabs, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;

import { fetchPengajar } from "../store/action/pengajar";
import {
  FetchKelasTahsinAnak,
  FetchKelasTahsinDewasa,
} from "../store/action/kelasTahsin";

const ColumsPengajar = [
  {
    title: "Nama",
    dataIndex: "nama",
    key: "nama",
  },
  {
    title: "Telepon",
    dataIndex: "telepon",
    key: "telepon",
  },
  {
    title: "Alamat",
    dataIndex: "alamat",
    key: "alamat",
  },
  {
    title: "Pekerjaan",
    dataIndex: "pekerjaan",
    key: "pekerjaan",
  },
  {
    title: "Umur",
    dataIndex: "umur",
    key: "umur",
  },
  {
    title: "Status Aktif",
    dataIndex: "status_aktif",
    key: "status_aktif",
  },
];

const ColumsKelasAnak = [
  {
    title: "Kelas",
    dataIndex: "kelas",
    key: "kelas",
  },
  {
    title: "Pengajar",
    dataIndex: "PengajarTahsinId",
    key: "PengajarTahsinId",
  },
  {
    title: "Hari",
    dataIndex: "hari",
    key: "hari",
  },
  {
    title: "Catatan",
    dataIndex: "catatan",
    key: "catatan",
  },
  {
    title: "Kuota",
    dataIndex: "kuota",
    key: "kuota",
  },
  {
    title: "Status Aktif",
    dataIndex: "status_aktif",
    key: "status_aktif",
  },
];

const ColumsKelasDewasa = [
  {
    title: "Kelas",
    dataIndex: "kelas",
    key: "kelas",
  },
  {
    title: "Pengajar",
    dataIndex: "PengajarTahsinId",
    key: "PengajarTahsinId",
  },
  {
    title: "Hari",
    dataIndex: "hari",
    key: "hari",
  },
  {
    title: "Catatan",
    dataIndex: "catatan",
    key: "catatan",
  },
  {
    title: "Kuota",
    dataIndex: "kuota",
    key: "kuota",
  },
  {
    title: "Status Aktif",
    dataIndex: "status_aktif",
    key: "status_aktif",
  },
];

const ColumsPesertAnak = [
  {
    title: "Nama Anak",
    dataIndex: "nama_anak",
    key: "nama_anak",
  },
  {
    title: "Nama Ayah",
    dataIndex: "nama_ayah",
    key: "nama_ayah",
  },
  {
    title: "Nama Ibu",
    dataIndex: "nama_ibu",
    key: "nama_ibu",
  },
  {
    title: "Telepon",
    dataIndex: "telepon",
    key: "telepon",
  },
  {
    title: "Alamat",
    dataIndex: "alamat",
    key: "alamat",
  },
  {
    title: "Kelas",
    dataIndex: "kelas",
    key: "kelas",
  },
  {
    title: "Baca Quran",
    dataIndex: "baca_quran",
    key: "baca_quran",
  },
  {
    title: "Status Aktif",
    dataIndex: "status_aktif",
    key: "status_aktif",
  },
];
const dataPesertaAnak = [];

const ColumsPesertaDewasa = [
  {
    title: "Nama",
    dataIndex: "nama",
    key: "nama",
  },
  {
    title: "Telepon",
    dataIndex: "telepon",
    key: "telepon",
  },
  {
    title: "Alamat",
    dataIndex: "alamat",
    key: "alamat",
  },
  {
    title: "Pekerjaan",
    dataIndex: "pekerjaan",
    key: "pekerjaan",
  },
  {
    title: "Umur",
    dataIndex: "umur",
    key: "umur",
  },
  {
    title: "Kelas",
    dataIndex: "kelas",
    key: "kelas",
  },
  {
    title: "Status Aktif",
    dataIndex: "status_aktif",
    key: "status_aktif",
  },
];

const dataPesertaDewasa = [];

const Kajian = () => {
  const dispatch = useDispatch();
  const { Pengajars } = useSelector((state) => state.PengajarReducer);
  const { KelasTahsinDewasas } = useSelector(
    (state) => state.KelasTahsinReducer
  );
  const { KelasTahsinAnaks } = useSelector((state) => state.KelasTahsinReducer);

  useEffect(() => {
    dispatch(fetchPengajar());
    dispatch(FetchKelasTahsinDewasa());
    dispatch(FetchKelasTahsinAnak());
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

                  <Tooltip placement="top" title={"Tambahkan Pengajar Tahsin"}>
                    <Button
                      size="large"
                      icon={<PlusOutlined />}
                      className="bg-primaryLight text-white"
                    >
                      Pengajar
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  <Table
                    columns={ColumsPengajar}
                    dataSource={Pengajars.data}
                    pagination={false}
                    scroll={{
                      y: 440,
                    }}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "Kelas Anak",
            key: "2",
            children: (
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

                  <Tooltip
                    placement="top"
                    title={"Tambahkan Kelas Tahsin Anak"}
                  >
                    <Button
                      size="large"
                      icon={<PlusOutlined />}
                      className="bg-primaryLight text-white"
                    >
                      Kelas Tahsin
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  <Table
                    columns={ColumsKelasAnak}
                    dataSource={KelasTahsinAnaks.data}
                    pagination={false}
                    scroll={{
                      y: 440,
                    }}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "Kelas  Dewasa",
            key: "3",
            children: (
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

                  <Tooltip
                    placement="top"
                    title={"Tambahkan Kelas Tahsin Dewasa"}
                  >
                    <Button
                      size="large"
                      icon={<PlusOutlined />}
                      className="bg-primaryLight text-white"
                    >
                      Kelas Tahsin
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  <Table
                    columns={ColumsKelasDewasa}
                    dataSource={KelasTahsinDewasas.data}
                    pagination={false}
                    scroll={{
                      y: 440,
                    }}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "Peserta Anak",
            key: "4",
            children: (
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

                  <Tooltip
                    placement="top"
                    title={"Tambahkan Peserta Tahsin Anak"}
                  >
                    <Button
                      size="large"
                      icon={<PlusOutlined />}
                      className="bg-primaryLight text-white"
                    >
                      Peserta Tahsin
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  <Table
                    columns={ColumsPesertAnak}
                    dataSource={dataPesertaAnak}
                    pagination={false}
                    scroll={{
                      y: 440,
                    }}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "Peserta Dewasa",
            key: "5",
            children: (
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

                  <Tooltip
                    placement="top"
                    title={"Tambahkan Peserta Tahsin Dewasa"}
                  >
                    <Button
                      size="large"
                      icon={<PlusOutlined />}
                      className="bg-primaryLight text-white"
                    >
                      Peserta Tahsin
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  <Table
                    columns={ColumsPesertaDewasa}
                    dataSource={dataPesertaDewasa}
                    pagination={false}
                    scroll={{
                      y: 440,
                    }}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Kajian;
