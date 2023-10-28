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
  createPesertaTahsinAnak,
  deletePesertaTahsinAnak,
  getAllPesertaTahsinAnak,
  getOnePesertaTahsinAnak,
  updatePesertaTahsinAnak,
  updateStatusPesertaTahsinAnak,
} from "../../store/action/pesertaTahsin";

import { getAllKelasTahsinAnak } from "../../store/action/kelasTahsin";

const TabPesertaTahsinAnak = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const { PesertaTahsinAnaks, PesertaTahsinAnak } = useSelector(
    (state) => state.PesertaTahsinReducer
  );

  const { KelasTahsinAnaks } = useSelector((state) => state.KelasTahsinReducer);

  useEffect(() => {
    dispatch(getAllPesertaTahsinAnak());
    dispatch(getAllKelasTahsinAnak());
  }, []);

  let [namaAyahPeserta, setNamaAyah] = useState("");
  let [namaIbuPeserta, setNamaIbu] = useState("");
  let [namaAnakPeserta, setNamaAnak] = useState("");
  let [umurAnakPeserta, setUmurAnak] = useState("");
  let [teleponPeserta, setTelepon] = useState("");
  let [alamatPeserta, setAlamat] = useState("");
  let [bacaQuranPeserta, setBacaQuran] = useState(null);
  let [kelasTahsinAnak, setKelasTahsinAnak] = useState("");

  const fatchData = () => {
    dispatch(getAllPesertaTahsinAnak());

    setNamaAyah("");
    setNamaIbu("");
    setNamaAnak("");
    setUmurAnak("");
    setTelepon("");
    setAlamat("");
    setBacaQuran(null);
    setKelasTahsinAnak("");
  };

  useEffect(() => {
    setNamaAyah(PesertaTahsinAnak?.data?.nama_ayah);
    setNamaIbu(PesertaTahsinAnak?.data?.nama_ibu);
    setNamaAnak(PesertaTahsinAnak?.data?.nama_anak);
    setUmurAnak(PesertaTahsinAnak?.data?.umur_anak);
    setTelepon(PesertaTahsinAnak?.data?.telepon);
    setAlamat(PesertaTahsinAnak?.data?.alamat);
    setBacaQuran(PesertaTahsinAnak?.data?.baca_quran);
    setKelasTahsinAnak(PesertaTahsinAnak?.data?.KelasTahsinAnak?.id);
  }, [PesertaTahsinAnak]);

  const actionPesertaTahsin = (id) => {
    let dataPesertaAnak = {
      nama_ayah: namaAyahPeserta,
      nama_ibu: namaIbuPeserta,
      nama_anak: namaAnakPeserta,
      umur_anak: umurAnakPeserta,
      telepon: teleponPeserta,
      alamat: alamatPeserta,
      baca_quran: bacaQuranPeserta,
      KelasTahsinAnakId: kelasTahsinAnak,
    };

    dispatch(
      id
        ? updatePesertaTahsinAnak(id, dataPesertaAnak)
        : createPesertaTahsinAnak(dataPesertaAnak)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllPesertaTahsinAnak());
              handleChangeTabs("");
            });
          } else {
            message.error(data.response.data.message);
          }
        })
      )
      .catch((error) => console.log(error));
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  const handleSearch = (value) => {
    dispatch(getAllPesertaTahsinAnak(value));
  };

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
        return data?.KelasTahsinAnak?.kelas;
      },
    },
    {
      title: "Pegajar",
      align: "center",
      render: (data) => {
        return data?.KelasTahsinAnak?.PengajarTahsin?.nama;
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
        const dispatch = useDispatch();
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusPesertaTahsinAnak(data.id, newStatus)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(
                  `Status ${newStatus ? "Aktif" : "Tidak Aktif"}`
                );
                dispatch(getAllPesertaTahsinAnak());
              } else {
                message.error(response.message);
              }
            }
          );
        };

        const menu = (
          <Menu className="w-28">
            <Menu.Item key="aktif" onClick={() => handleStatusChange(true)}>
              Aktif
            </Menu.Item>
            <Menu.Item
              key="tidak-aktif"
              onClick={() => handleStatusChange(false)}
            >
              Tidak Aktif
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <div>
                {data.status_aktif ? (
                  <Tag color="success">Aktif</Tag>
                ) : (
                  <Tag color="error" style={{ color: "red" }}>
                    Tidak Aktif
                  </Tag>
                )}
              </div>
            </a>
          </Dropdown>
        );
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
          if (e.key === "edit") {
            dispatch(setTabsValue("UpdatePesertaAnak"));
            dispatch(getOnePesertaTahsinAnak(id));
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
                dispatch(deletePesertaTahsinAnak(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllPesertaTahsinAnak());
                    } else {
                      message.error(data.response.data.message);
                    }
                  });
                });
              }
            });
          }
        };

        const menu = (
          <Menu onClick={(e) => handleMenuClick(e, data.id)}>
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
          <div>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <DownCircleOutlined className="text-lg text-slate-500" />
              </a>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const BisaQuran = [
    {
      id: 1,
      nama: "Bisa Baca Quran",
      value: true,
    },
    {
      id: 2,
      nama: "Belum Bisa Baca Quran",
      value: false,
    },
  ];

  return (
    <div>
      {TabsValues == "TambahPesertaAnak" ||
      TabsValues == "UpdatePesertaAnak" ? (
        <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex gap-2 items-center">
            <ArrowLeftOutlined
              className=" text-[16px]"
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
                className="mt-[5px] "
                id="namaAyahAnak"
                value={namaAyahPeserta}
                onChange={(e) => setNamaAyah(e.target.value)}
                placeholder="Masukkan Nama Ayah"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="namaIbuAnak">Nama Ibu</label>
              <Input
                className="mt-[5px]"
                id="namaIbuAnak"
                value={namaIbuPeserta}
                onChange={(e) => setNamaIbu(e.target.value)}
                placeholder="Masukkan Nama Ibu"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="namaAnak">Nama Anak</label>
              <Input
                className="mt-[5px] "
                id="namaAnak"
                value={namaAnakPeserta}
                onChange={(e) => setNamaAnak(e.target.value)}
                placeholder="Masukkan Nama Anak"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="umurAnak">Umur Anak</label>
              <Input
                className="mt-[5px] "
                id="umurAnak"
                value={umurAnakPeserta}
                onChange={(e) => setUmurAnak(e.target.value)}
                placeholder="Masukkan Umur Anak"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPesertaAnak">Telepon</label>
              <Input
                className="mt-[5px] "
                id="teleponPesertaAnak"
                value={teleponPeserta}
                onChange={(e) => setTelepon(e.target.value)}
                placeholder="Masukkan Telepon"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="KelasTahsinAnak">Kelas Tahsin</label>
              {KelasTahsinAnaks && KelasTahsinAnaks?.data?.length > 0 ? (
                <Select
                  id="KelasTahsinAnak"
                  className="mt-[5px]"
                  value={kelasTahsinAnak ? kelasTahsinAnak : null}
                  placeholder="Pilih Kelas Tahsin"
                  onChange={(value) => setKelasTahsinAnak(value)}
                >
                  {KelasTahsinAnaks?.data.map((kelas) => (
                    <Option key={kelas?.id} value={kelas?.id}>
                      {kelas?.kelas}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Pengajar Tahsin Belum Ada</div>
              )}
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="alamatPesertaAnak">Alamat</label>
              <Input.TextArea
                className="mt-[5px]"
                id="alamatPesertaAnak"
                value={alamatPeserta}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Masukkan Alamat"
                rows={4}
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="bisaBacaQuran">Baca Quran</label>
              {BisaQuran && BisaQuran.length > 0 ? (
                <Select
                  id="bisaBacaQuran"
                  placeholder="Apakah Anak Bisa Baca Quran?"
                  value={bacaQuranPeserta != null ? bacaQuranPeserta : null}
                  className="mt-[5px]"
                  onChange={(value) => setBacaQuran(value)}
                >
                  {BisaQuran.map((el) => (
                    <Option key={el.id} value={el.value}>
                      {el.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Loading Hari...</div>
              )}
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
                TabsValues === "TambahPesertaAnak"
                  ? () => actionPesertaTahsin()
                  : TabsValues === "UpdatePesertaAnak"
                  ? () => actionPesertaTahsin(PesertaTahsinAnak.data.id)
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
              onSearch={handleSearch}
              style={{
                width: 400,
              }}
            />

            <Tooltip placement="top" title={"Tambahkan Peserta Tahsin Anak"}>
              <Button
                onClick={() => {
                  handleChangeTabs("TambahPesertaAnak");
                  fatchData();
                }}
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
              >
                Peserta Anak
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              size="small"
              columns={ColumsPesertAnak}
              dataSource={PesertaTahsinAnaks.data}
              pagination={false}
              scroll={{
                y: 400,
                x: 1400,
              }}
              rowKey={PesertaTahsinAnaks.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPesertaTahsinAnak;
