import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

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
  Popconfirm,
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
  addPengajar,
  deletePengajar,
  editPengajar,
  fetchPengajar,
  getOnePengajar,
} from "../store/action/pengajar";
import {
  FetchKelasTahsinAnak,
  FetchKelasTahsinDewasa,
  addKelasAnak,
} from "../store/action/kelasTahsin";

import {
  FetchPesertaTahsinAnak,
  FetchPesertaTahsinDewasa,
} from "../store/action/pesertaTahsin";
import { setTabsValue } from "../store/action/tabs";

const ColumsPengajar = [
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
  {
    title: "Action",
    fixed: "right",
    align: "center",
    width: 75,
    render: (data) => {
      const dispatch = useDispatch();
      const handleMenuClick = (e, id) => {
        if (e.key === "detail") {
          console.log(`Detail untuk ${data.nama}`);
        } else if (e.key === "edit") {
          dispatch(setTabsValue("EditPengajar"));
          dispatch(getOnePengajar(id));
        } else if (e.key === "delete") {
          Swal.fire({
            text: "Apakah Anda Mau Menghapus?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deletePengajar(id));
              Swal.fire(
                "Berhasil!",
                "Berhasil Menghapus Data Pengajar",
                "success"
              );
            }
          });
        }
      };

      const menu = (
        <Menu onClick={(e) => handleMenuClick(e, data.id)}>
          <Menu.Item key="detail">
            <InfoCircleOutlined /> Detail
          </Menu.Item>
          <Menu.Item key="edit">
            <EditOutlined /> Edit
          </Menu.Item>
          <Menu.Item key="delete" style={{ color: "red" }}>
            <DeleteOutlined />
            Hapus
          </Menu.Item>
        </Menu>
      );

      return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <a
            className="ant-dropdown-link"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <DownCircleOutlined className="text-lg text-slate-500" />
          </a>
        </Dropdown>
      );
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

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Pengajars, Pengajar } = useSelector((state) => state.PengajarReducer);
  const { KelasTahsinDewasas, KelasTahsinAnaks } = useSelector(
    (state) => state.KelasTahsinReducer
  );
  const {
    PesertaTahsinAnaks,
    PesertaTahsinAnak,
    PesertaTahsinDewasa,
    PesertaTahsinDewasas,
  } = useSelector((state) => state.PesertaTahsinReducer);

  useEffect(() => {
    dispatch(fetchPengajar());
    dispatch(FetchKelasTahsinDewasa());
    dispatch(FetchKelasTahsinAnak());
    dispatch(FetchPesertaTahsinAnak());
    dispatch(FetchPesertaTahsinDewasa());
  }, [TabsValues]);

  const Hari = [
    { id: 1, nama: "Senin" },
    { id: 2, nama: "Selasa" },
    { id: 3, nama: "Rabu" },
    { id: 4, nama: "Kamis" },
    { id: 5, nama: "Jumat" },
    { id: 6, nama: "Sabtu" },
    { id: 7, nama: "Ahad" },
  ];

  let [namaPengajar, setNamaPengajar] = useState("");
  let [teleponPengajar, setTeleponPengajar] = useState("");
  let [umurPengajar, setUmurPengajar] = useState("");
  let [alamatPengajar, setAlamatPengajar] = useState("");
  let [pekerjaanPengajar, setPekerjaanPengajar] = useState("");

  useEffect(() => {
    if (Pengajar) {
      setNamaPengajar(Pengajar?.data?.nama);
      setTeleponPengajar(Pengajar?.data?.telepon);
      setAlamatPengajar(Pengajar?.data?.alamat);
      setUmurPengajar(Pengajar?.data?.umur);
      setPekerjaanPengajar(Pengajar?.data?.pekerjaan);
    }
  }, [Pengajar]);

  useEffect(() => {
    setNamaPengajar("");
    setTeleponPengajar("");
    setAlamatPengajar("");
    setUmurPengajar("");
    setPekerjaanPengajar("");
  }, [TabsValues]);

  const actionPengajar = (id) => {
    let datap = {
      nama: namaPengajar,
      telepon: teleponPengajar,
      alamat: alamatPengajar,
      pekerjaan: pekerjaanPengajar,
      umur: umurPengajar,
    };

    dispatch(id ? editPengajar(id, datap) : addPengajar(datap))
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(fetchPengajar());
              handleChangeTabs("");
            });
          } else {
            message.error(data.response.data.message);
          }
        })
      )
      .catch((error) => console.log(error));
  };

  const [kelasAnak, setKelasAnak] = useState("");
  const [hariKelasAnak, setHariKelasAnak] = useState("");
  const [pengajarKelasAnak, setPengajarKelasAnak] = useState("");
  const [kuotaKelasAnak, setKuotaKelasAnak] = useState(0);
  const [catatanKelasAnak, setCatatanKelasAnak] = useState("");

  const submitKelasAnak = () => {
    dispatch(
      addKelasAnak({
        hari: hariKelasAnak,
        kelas: kelasAnak,
        catatan: catatanKelasAnak,
        kuota: kuotaKelasAnak,
        PengajarTahsinId: pengajarKelasAnak,
        jumlah_peserta: 0,
      })
    );

    setTabs("");
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  return (
    <div className="w-full h-full px-5">
      <Tabs
        className=""
        type="line"
        defaultActiveKey="1"
        items={[
          {
            label: "Pengajar",
            key: "1",
            children:
              TabsValues == "TambahPengajar" || TabsValues == "EditPengajar" ? (
                <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
                  {/* Header */}
                  <div className="flex gap-3 items-center">
                    <ArrowLeftOutlined
                      className=" text-[16px]"
                      onClick={() => {
                        handleChangeTabs("");
                      }}
                    />
                    <p className="font-semibold text-[16px] ">
                      {TabsValues == "TambahPengajar"
                        ? "Tambah Pengajar"
                        : TabsValues == "EditPengajar"
                        ? "Edit Pengajar"
                        : ""}
                    </p>
                  </div>

                  {/* Inputan */}
                  <div className="w-full flex flex-wrap justify-between">
                    <div className="w-[45%] mb-5">
                      <label htmlFor="namaPengajar">Nama</label>
                      <Input
                        value={namaPengajar}
                        onChange={(e) => setNamaPengajar(e.target.value)}
                        className="mt-[5px]"
                        id="namaPengajar"
                        placeholder="Masukkan Nama Pengajar"
                      />
                    </div>
                    <div className="w-[45%] mb-5">
                      <label htmlFor="teleponPengajar">Telepon</label>
                      <Input
                        value={teleponPengajar}
                        onChange={(e) => setTeleponPengajar(e.target.value)}
                        className="mt-[5px]"
                        id="teleponPengajar"
                        placeholder="Masukkan Telepon Pengajar"
                      />
                    </div>
                    <div className="w-[45%] mb-5">
                      <label htmlFor="pekerjaanPengajar">Pekerjaan</label>
                      <Input
                        value={pekerjaanPengajar}
                        onChange={(e) => setPekerjaanPengajar(e.target.value)}
                        className="mt-[5px]"
                        id="pekerjaanPengajar"
                        placeholder="Masukkan Pekerjaan Pengajar"
                      />
                    </div>
                    <div className="w-[45%] mb-5">
                      <label htmlFor="umurPengajar">Umur</label>
                      <Input
                        value={umurPengajar}
                        onChange={(e) => setUmurPengajar(e.target.value)}
                        className="mt-[5px]"
                        id="umurPengajar"
                        placeholder="Masukkan Umur Pengajar"
                      />
                    </div>
                    <div className="w-[45%] mb-5">
                      <label htmlFor="alamatPengajar">Alamat</label>
                      <Input.TextArea
                        value={alamatPengajar}
                        onChange={(e) => setAlamatPengajar(e.target.value)}
                        className="mt-[5px]"
                        rows={5}
                        id="alamatPengajar"
                        placeholder="Masukkan Alamat Pengajar"
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
                      onClick={
                        TabsValues == "TambahPengajar"
                          ? () => actionPengajar()
                          : TabsValues == "EditPengajar"
                          ? () => actionPengajar(Pengajar.data.id)
                          : null
                      }
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
                      // onSearch={onSearch}
                      style={{
                        width: 400,
                      }}
                    />

                    <Tooltip
                      placement="top"
                      title={"Tambahkan Pengajar Tahsin"}
                    >
                      <Button
                        icon={<PlusOutlined />}
                        className="bg-primaryLight text-white"
                        onClick={() => {
                          handleChangeTabs("TambahPengajar");
                        }}
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
                      size="small"
                      scroll={{
                        y: 400,
                        x: 1200,
                      }}
                    />
                  </div>
                </div>
              ),
          },
          {
            label: "Kelas Anak",
            key: "2",
            children:
              TabsValues == "TambahKelasAnak" ? (
                <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
                  {/* Header */}
                  <div className="flex gap-2 items-center">
                    <ArrowLeftOutlined
                      className=" text-[20px]"
                      onClick={() => {
                        handleChangeTabs("");
                      }}
                    />
                    <p className="font-semibold text-[16px]">
                      Tambah Kelas Anak
                    </p>
                  </div>

                  {/* Inputan */}
                  <div className="w-full flex flex-wrap justify-between">
                    <div className="w-[45%] mb-5">
                      <label htmlFor="kelasAnak">Nama Kelas</label>
                      <Input
                        value={kelasAnak}
                        className=""
                        id="kelasAnak"
                        size="large"
                        placeholder="Masukkan Nama Kelas Tahsin Anak"
                        onChange={(e) => setKelasAnak(e.target.value)}
                      />
                    </div>
                    <div className="w-[45%] mb-5 flex flex-col">
                      <label htmlFor="pengajarTahsinAnak">
                        Pengajar Tahsin
                      </label>
                      {Pengajars && Pengajars.data.length > 0 ? (
                        <Select
                          id="pengajarTahsinAnak"
                          size="large"
                          placeholder="Pilih Pengajar Tahsin"
                          onChange={(value) => setPengajarKelasAnak(value)}
                        >
                          {Pengajars.data.map((pengajar) => (
                            <Option key={pengajar.id} value={pengajar.id}>
                              {pengajar.nama}
                            </Option>
                          ))}
                        </Select>
                      ) : (
                        <div>Pengajar Tahsin Belum Ada</div>
                      )}
                    </div>

                    <div className="w-[45%] mb-5 flex flex-col">
                      <label htmlFor="jadwalTahsinAnak">Jadwal Tahsin</label>
                      {Hari && Hari.length > 0 ? (
                        <Select
                          id="jadwalTahsinAnak"
                          size="large"
                          placeholder="Pilih Jadwal Kelas Tahsin"
                          onChange={(value) => setHariKelasAnak(value)}
                        >
                          {Hari.map((hari) => (
                            <Option key={hari.id} value={hari.nama}>
                              {hari.nama}
                            </Option>
                          ))}
                        </Select>
                      ) : (
                        <div>Loading Hari...</div>
                      )}
                    </div>

                    <div className="w-[45%] mb-5 flex flex-col">
                      <label htmlFor="kuotaKelasAnak">Kuota Kelas Tahsin</label>
                      <InputNumber
                        value={kuotaKelasAnak}
                        onChange={(value) => setKuotaKelasAnak(value)}
                        className="w-full"
                        id="kuotaKelasAnak"
                        size="large"
                        placeholder="Masukkan Kuota Kelas Tahsin"
                      />
                    </div>

                    <div className="w-[45%] mb-5">
                      <label htmlFor="catatanKelasAnak">Catatan</label>
                      <Input.TextArea
                        value={catatanKelasAnak}
                        onChange={(e) => setCatatanKelasAnak(e.target.value)}
                        className=""
                        id="catatanKelasAnak"
                        size="large"
                        placeholder="Masukkan Catatan"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <Button
                      onClick={() => {
                        setTabs("");
                      }}
                      type="default"
                      className="text-primaryDark border-primaryDark"
                    >
                      Batal
                    </Button>
                    <Button
                      type="primary"
                      className="bg-primaryDark"
                      onClick={() => submitKelasAnak()}
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

                    <Tooltip
                      placement="top"
                      title={"Tambahkan Kelas Tahsin Anak"}
                    >
                      <Button
                        onClick={() => {
                          handleChangeTabs("TambahKelasAnak");
                        }}
                        size="large"
                        icon={<PlusOutlined />}
                        className="bg-primaryLight text-white"
                      >
                        Kelas Anak
                      </Button>
                    </Tooltip>
                  </div>
                  <div>
                    <Table
                      columns={ColumsKelasAnak}
                      dataSource={KelasTahsinAnaks.data}
                      pagination={false}
                      scroll={{
                        y: 400,
                      }}
                    />
                  </div>
                </div>
              ),
          },
          {
            label: "Kelas Dewasa",
            key: "3",
            children:
              TabsValues == "TambahKelasDewasa" ? (
                <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
                  {/* Header */}
                  <div className="flex gap-2 items-center">
                    <ArrowLeftOutlined
                      className=" text-[20px]"
                      onClick={() => {
                        handleChangeTabs("");
                      }}
                    />
                    <p className="font-semibold text-[16px]">
                      Tambah Kelas Dewasa
                    </p>
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
                      <label htmlFor="pengajarTahsinAnak">
                        Pengajar Tahsin
                      </label>
                      {Pengajars && Pengajars.data.length > 0 ? (
                        <Select
                          id="pengajarTahsinAnak"
                          size="large"
                          placeholder="Pilih Pengajar Tahsin"
                          onChange={(value) => setPengajarKelasAnak(value)}
                        >
                          {Pengajars.data.map((pengajar) => (
                            <Option key={pengajar.id} value={pengajar.id}>
                              {pengajar.nama}
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
                      <label htmlFor="kuotaKelasDewasa">
                        Kuota Kelas Tahsin
                      </label>
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
                        setTabs("");
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
                        y: 400,
                      }}
                    />
                  </div>
                </div>
              ),
          },
          {
            label: "Peserta Anak",
            key: "4",
            children:
              TabsValues == "TambahPesertaAnak" ? (
                <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
                  {/* Header */}
                  <div className="flex gap-2 items-center">
                    <ArrowLeftOutlined
                      className=" text-[20px]"
                      onClick={() => {
                        handleChangeTabs("");
                      }}
                    />
                    <p className="font-semibold text-[16px]">
                      Tambah Peserta Anak
                    </p>
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
                        setTabs("");
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

                    <Tooltip
                      placement="top"
                      title={"Tambahkan Peserta Tahsin Anak"}
                    >
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
              ),
          },
          {
            label: "Peserta Dewasa",
            key: "5",
            children:
              TabsValues == "TambahPesertaDewasa" ? (
                <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
                  {/* Header */}
                  <div className="flex gap-2 items-center">
                    <ArrowLeftOutlined
                      className=" text-[20px]"
                      onClick={() => {
                        handleChangeTabs("");
                      }}
                    />
                    <p className="font-semibold text-[16px]">
                      Tambah Peserta Dewasa
                    </p>
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
                      <label htmlFor="kelasTahsinDewasa">
                        Kelas Tahsin Anak
                      </label>
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
                        setTabs("");
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

                    <Tooltip
                      placement="top"
                      title={"Tambahkan Peserta Tahsin Dewasa"}
                    >
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
