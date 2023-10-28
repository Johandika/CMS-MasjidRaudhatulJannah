import { useEffect } from "react";

import { Table, Tag, Input, Tabs, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;
import { useDispatch, useSelector } from "react-redux";

import ubahFormatDate from "../../components/utils/date";

import {
  getAllKajianRutin,
  getAllKajianTablighAkbar,
  getAllKategoriKajian,
} from "../../store/action/kajian";
import { getAllUstadz } from "../../store/action/ustadz";

const ColumnKategoriKajian = [
  {
    title: "Nama",
    width: 200,
    render: (data) => {
      return data.nama;
    },
  },
  {
    title: "Catatan",
    width: 700,
    render: (data) => {
      return data.catatan;
    },
  },
  {
    title: "Total Kajian",
    render: (data) => {
      return data.Kajians.length;
    },
  },
];

const ColumnUstadz = [
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

const ColumnKajianRutin = [
  {
    title: "Jadwal (Hari)",
    render: (data) => {
      return data.Jadwal.hari;
    },
  },
  {
    title: "Ustadz",
    render: (data) => {
      return data.Ustadz.nama;
    },
  },
  {
    title: "Tema",
    render: (data) => {
      return data.tema;
    },
  },
  {
    title: "Kategori",
    render: (data) => {
      return data.KategoriKajian.nama;
    },
  },
  {
    title: "Catatan",
    render: (data) => {
      return data.catatan;
    },
  },
  {
    title: "Informasi",
    render: (data) => {
      return data.informasi;
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

const ColumnTabligAkbar = [
  {
    title: "Tema",
    width: 250,
    render: (data) => {
      return data.tema;
    },
  },
  {
    title: "Ustadz",
    width: 200,
    render: (data) => {
      return data.nama_ustadz;
    },
  },
  {
    title: "Ustadz Penerjemah",
    width: 200,
    render: (data) => {
      return data.nama_penerjemah ? data.nama_penerjemah : "-";
    },
  },
  {
    title: "Waktu",
    width: 200,
    render: (data) => {
      return ubahFormatDate(data.waktu);
    },
  },
  {
    title: "Kategori",
    width: 150,
    render: (data) => {
      return data.KategoriKajian.nama;
    },
  },
  {
    width: 150,
    title: "Catatan",
    render: (data) => {
      return data.catatan;
    },
  },
  {
    title: "Informasi",
    width: 200,
    render: (data) => {
      return data.informasi;
    },
  },
  {
    title: "Link Kajian",
    width: 200,
    render: (data) => {
      return data.link ? data.link : "-";
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

const TabUstadz = () => {
  const dispatch = useDispatch();

  const { KajianRutins } = useSelector((state) => state.KajianReducer);
  const { KajianTablighAkbars } = useSelector((state) => state.KajianReducer);
  const { KategoriKajians } = useSelector((state) => state.KajianReducer);
  const { Ustadzs } = useSelector((state) => state.UstadzReducer);

  useEffect(() => {
    dispatch(getAllKajianRutin());
    dispatch(getAllUstadz());
    dispatch(getAllKajianTablighAkbar());
    dispatch(getAllKategoriKajian());
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
                    title={"Tambahkan Pengajar Tahsin"}
                  >
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
                    columns={ColumnUstadz}
                    dataSource={Ustadzs.data}
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
            label: "Kategori Kajian",
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
                    title={"Tambahkan Pengajar Tahsin"}
                  >
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
                    columns={ColumnKategoriKajian}
                    dataSource={KategoriKajians.data}
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
            label: "Kajian Rutin",
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
                    title={"Tambahkan Pengajar Tahsin"}
                  >
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
                    columns={ColumnKajianRutin}
                    dataSource={KajianRutins.data}
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
            label: "Tabligh Akbar",
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
                    title={"Tambahkan Pengajar Tahsin"}
                  >
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
                    columns={ColumnTabligAkbar}
                    dataSource={KajianTablighAkbars.data}
                    pagination={false}
                    scroll={{
                      y: 440,
                      x: 1700,
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

export default TabUstadz;
