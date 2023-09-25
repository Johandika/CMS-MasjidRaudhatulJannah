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

import {
  FetchPesertaTahsinAnak,
  FetchPesertaTahsinDewasa,
} from "../store/action/pesertaTahsin";

const ColumsPengajar = [
  {
    title: "Nama",
    render: (data) => {
      return data.nama;
    },
  },
  {
    title: "Telepon",
    render: (data) => {
      return data.telepon;
    },
  },
  {
    title: "Alamat",
    render: (data) => {
      return data.alamat;
    },
  },
  {
    title: "Pekerjaan",
    render: (data) => {
      return data.pekerjaan;
    },
  },
  {
    title: "Umur",
    render: (data) => {
      return `${data.umur} Tahun`;
    },
  },
  {
    title: "Status Aktif",
    render: (data) => {
      if (data.status_aktif == true) {
        return <Tag color="success">Aktif</Tag>;
      } else {
        return <Tag color="error">Tidak Aktif</Tag>;
      }
    },
  },
];

const ColumsKelasAnak = [
  {
    title: "Kelas",
    render: (data) => {
      return data.kelas;
    },
  },
  {
    title: "Pengajar",
    render: (data) => {
      return data.PengajarTahsin.nama;
    },
  },
  {
    title: "Hari",
    render: (data) => {
      return data.Jadwal.hari;
    },
  },
  {
    title: "Catatan",
    render: (data) => {
      return data.catatan;
    },
  },
  {
    title: "Kuota",
    render: (data) => {
      return data.kuota;
    },
  },
  {
    title: "Status Aktif",
    render: (data) => {
      if (data.status_aktif == true) {
        return <Tag color="success">Aktif</Tag>;
      } else {
        return <Tag color="error">Tidak Aktif</Tag>;
      }
    },
  },
];

const ColumsKelasDewasa = [
  {
    title: "Kelas",
    render: (data) => {
      return data.kelas;
    },
  },
  {
    title: "Pengajar",
    render: (data) => {
      return data.PengajarTahsin.nama;
    },
  },
  {
    title: "Hari",
    render: (data) => {
      return data.Jadwal.hari;
    },
  },
  {
    title: "Catatan",
    render: (data) => {
      return data.catatan;
    },
  },
  {
    title: "Kuota",
    render: (data) => {
      return data.kuota;
    },
  },
  {
    title: "Status Aktif",
    render: (data) => {
      if (data.status_aktif == true) {
        return <Tag color="success">Aktif</Tag>;
      } else {
        return <Tag color="error">Tidak Aktif</Tag>;
      }
    },
  },
];

const ColumsPesertAnak = [
  {
    title: "Nama Anak",
    render: (data) => {
      return data.nama_anak;
    },
  },
  {
    title: "Nama Ayah",
    render: (data) => {
      return data.nama_ayah;
    },
  },
  {
    title: "Nama Ibu",
    render: (data) => {
      return data.nama_ibu;
    },
  },
  {
    title: "Telepon",
    render: (data) => {
      return data.telepon;
    },
  },
  {
    title: "Alamat",
    render: (data) => {
      return data.alamat;
    },
  },
  {
    title: "Kelas",
    render: (data) => {
      return data.KelasTahsinAnak.kelas;
    },
  },
  {
    title: "Baca Quran",
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
    render: (data) => {
      if (data.status_aktif == true) {
        return <Tag color="success">Aktif</Tag>;
      } else {
        return <Tag color="error">Tidak Aktif</Tag>;
      }
    },
  },
];

const ColumsPesertaDewasa = [
  {
    title: "Nama",
    render: (data) => {
      return data.nama;
    },
  },
  {
    title: "Telepon",
    render: (data) => {
      return data.telepon;
    },
  },
  {
    title: "Alamat",
    render: (data) => {
      return data.alamat;
    },
  },
  {
    title: "Pekerjaan",
    render: (data) => {
      return data.pekerjaan;
    },
  },
  {
    title: "Umur",
    render: (data) => {
      return `${data.umur} Tahun`;
    },
  },
  {
    title: "Kelas",
    render: (data) => {
      return data.KelasTahsinDewasa.kelas;
    },
  },
  {
    title: "Status Aktif",
    render: (data) => {
      if (data.status_aktif == true) {
        return <Tag color="success">Aktif</Tag>;
      } else {
        return <Tag color="error">Tidak Aktif</Tag>;
      }
    },
  },
];

const Kajian = () => {
  const dispatch = useDispatch();
  const { Pengajars } = useSelector((state) => state.PengajarReducer);
  const { KelasTahsinDewasas } = useSelector(
    (state) => state.KelasTahsinReducer
  );
  const { KelasTahsinAnaks } = useSelector((state) => state.KelasTahsinReducer);
  const { PesertaTahsinDewasas } = useSelector(
    (state) => state.PesertaTahsinReducer
  );
  const { PesertaTahsinAnaks } = useSelector(
    (state) => state.PesertaTahsinReducer
  );

  useEffect(() => {
    dispatch(fetchPengajar());
    dispatch(FetchKelasTahsinDewasa());
    dispatch(FetchKelasTahsinAnak());
    dispatch(FetchPesertaTahsinAnak());
    dispatch(FetchPesertaTahsinDewasa());
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
                    dataSource={PesertaTahsinAnaks.data}
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
                    dataSource={PesertaTahsinDewasas.data}
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
