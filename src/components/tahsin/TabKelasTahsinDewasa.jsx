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
  getAllKelasTahsinDewasa,
  getOneKelasTahsinDewasa,
  createKelasTahsinDewasa,
  updateKelasTahsinDewasa,
  updateStatusKelasTahsinDewasa,
  deleteKelasTahsinDewasa,
} from "../../store/action/kelasTahsin";

const Hari = [
  { id: 1, nama: "Senin & Rabu" },
  { id: 2, nama: "Selasa & Kamis" },
  { id: 3, nama: "Jum'at & Ahad" },
];

const TabKelasTahsinDewasa = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const { KelasTahsinDewasas, KelasTahsinDewasa } = useSelector(
    (state) => state.KelasTahsinReducer
  );
  const { Pengajars, Pengajar } = useSelector((state) => state.PengajarReducer);

  const [kelasDewasa, setKelasDewasa] = useState("");
  const [hariKelasDewasa, setHariKelasDewasa] = useState("");
  const [pengajarKelasDewasa, setPengajarKelasDewasa] = useState("");
  const [kuotaKelasDewasa, setKuotaKelasDewasa] = useState(0);
  const [catatanKelasDewasa, setCatatanKelasDewasa] = useState("");
  const [tipeKelasDewasa, setTipeKelasDewasa] = useState("");

  const actionKelasTahsinDewasa = (id) => {
    let dataKelas = {
      hari: hariKelasDewasa,
      kelas: kelasDewasa,
      catatan: catatanKelasDewasa,
      kuota: kuotaKelasDewasa,
      PengajarTahsinId: pengajarKelasDewasa,
      jumlah_peserta: 0,
      tipe_kelas: tipeKelasDewasa,
    };

    dispatch(
      id
        ? updateKelasTahsinDewasa(id, dataKelas)
        : createKelasTahsinDewasa(dataKelas)
    ).then((data) => {
      message
        .loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllKelasTahsinDewasa());
              handleChangeTabs("");
            });
          } else {
            message.error(data.response.data.message);
          }
        })
        .catch((error) => console.log(error));
    });
  };

  useEffect(() => {
    setKelasDewasa(KelasTahsinDewasa?.data?.kelas);
    setHariKelasDewasa(KelasTahsinDewasa?.data?.Jadwal?.hari);
    setPengajarKelasDewasa(KelasTahsinDewasa?.data?.PengajarTahsin?.id);
    setKuotaKelasDewasa(KelasTahsinDewasa?.data?.kuota);
    setCatatanKelasDewasa(KelasTahsinDewasa?.data?.catatan);
    setTipeKelasDewasa(KelasTahsinDewasa?.data?.tipe_kelas);
  }, [KelasTahsinDewasa]);

  useEffect(() => {
    dispatch(getAllKelasTahsinDewasa());
  }, []);

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  const fatchData = () => {
    dispatch(getAllKelasTahsinDewasa());

    setKelasDewasa("");
    setHariKelasDewasa("");
    setPengajarKelasDewasa("");
    setKuotaKelasDewasa("");
    setCatatanKelasDewasa("");
    setTipeKelasDewasa("");
  };

  const handleSearch = (value) => {
    dispatch(getAllKelasTahsinDewasa(value));
  };

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
        return data.PengajarTahsin?.nama;
      },
    },
    {
      title: "Hari",
      align: "center",
      render: (data) => {
        return data.Jadwal?.hari;
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
      title: "Tipe Kelas",
      align: "center",
      render: (data) => {
        return data.tipe_kelas;
      },
    },
    {
      title: "Status Aktif",
      align: "center",
      render: (data) => {
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusKelasTahsinDewasa(data.id, newStatus)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(
                  `Status ${newStatus ? "Aktif" : "Tidak Aktif"}`
                );
                dispatch(getAllKelasTahsinDewasa());
              } else {
                message.error(response.message);
              }
            }
          );
        };

        const menu = (
          <Menu className="w-28">
            <Menu.Item
              key="aktif"
              onClick={() => handleStatusChange(true)}
            >
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
          <Dropdown
            overlay={menu}
            trigger={["click"]}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <div>
                {data.status_aktif ? (
                  <Tag color="success">Aktif</Tag>
                ) : (
                  <Tag
                    color="error"
                    style={{ color: "red" }}
                  >
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
            dispatch(setTabsValue("UpdateKelasDewasa"));
            dispatch(getOneKelasTahsinDewasa(id));
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
                dispatch(deleteKelasTahsinDewasa(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllKelasTahsinDewasa());
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
            <Menu.Item
              key="delete"
              style={{ color: "red" }}
            >
              <DeleteOutlined />
              Hapus
            </Menu.Item>
          </Menu>
        );

        return (
          <div>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
            >
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

  return (
    <div>
      {TabsValues == "TambahKelasDewasa" ||
      TabsValues == "UpdateKelasDewasa" ? (
        <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex gap-2 items-center">
            <ArrowLeftOutlined
              className=" text-[16px]"
              onClick={() => {
                handleChangeTabs("");
              }}
            />
            <p className="font-semibold text-[16px]">
              {TabsValues == "TambahKelasDewasa"
                ? "Tambah Kelas Tahsin Dewasa"
                : TabsValues == "UpdateKelasDewasa"
                ? "Edit Kelas Tahsin Dewasa"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="kelasDewasa">Nama Kelas</label>
              <Input
                className="mt-[5px]"
                id="kelasDewasa"
                autoComplete="off"
                value={kelasDewasa}
                placeholder="Masukkan Nama Kelas Tahsin Dewasa"
                onChange={(e) => setKelasDewasa(e.target.value)}
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="pengajarTahsinDewasa">Pengajar Tahsin</label>
              {Pengajars && Pengajars?.data?.length > 0 ? (
                <Select
                  id="pengajarTahsinDewasa"
                  className="mt-[5px]"
                  value={pengajarKelasDewasa ? pengajarKelasDewasa : null}
                  placeholder="Pilih Pengajar Tahsin"
                  onChange={(value) => setPengajarKelasDewasa(value)}
                >
                  {Pengajars?.data.map((pengajar) => (
                    <Option
                      key={pengajar?.id}
                      value={pengajar?.id}
                    >
                      {pengajar?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Pengajar Tahsin Belum Ada</div>
              )}
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="jadwalKelasDewasa">Jadwal Tahsin</label>
              {Hari && Hari?.length > 0 ? (
                <Select
                  id="jadwalKelasDewasa"
                  className="mt-[5px]"
                  value={hariKelasDewasa ? hariKelasDewasa : null}
                  placeholder="Pilih Jadwal Tahsin"
                  onChange={(value) => setHariKelasDewasa(value)}
                >
                  {Hari?.map((hari) => (
                    <Option
                      key={hari?.id}
                      value={hari.nama}
                    >
                      {hari?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Jadwal Tahsin Belum Ada</div>
              )}
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="kuotaKelasDewasa">Kuota Kelas Tahsin</label>
              <Input
                className="mt-[5px]"
                id="kuotaKelasDewasa"
                autoComplete="off"
                value={kuotaKelasDewasa}
                placeholder="Masukkan Kuota Kelas Tahsin"
                onChange={(e) => setKuotaKelasDewasa(e.target.value)}
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="catatanKelasDewasa">Catatan</label>
              <Input.TextArea
                className="mt-[5px]"
                id="catatanKelasDewasa"
                autoComplete="off"
                value={catatanKelasDewasa}
                placeholder="Masukkan Catatan"
                onChange={(e) => setCatatanKelasDewasa(e.target.value)}
                rows={4}
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="tipeKelasDewasa">Tipe Kelas Tahsin</label>
              <Input
                className="mt-[5px]"
                id="tipeKelasDewasa"
                autoComplete="off"
                value={tipeKelasDewasa}
                placeholder="Masukkan Tipe Kelas Tahsin"
                onChange={(e) => setTipeKelasDewasa(e.target.value)}
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
                TabsValues == "TambahKelasDewasa"
                  ? () => actionKelasTahsinDewasa()
                  : TabsValues == "UpdateKelasDewasa"
                  ? () => actionKelasTahsinDewasa(KelasTahsinDewasa.data.id)
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
              placeholder="Masukkan Nama Kelas"
              onSearch={handleSearch}
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
                  fatchData();
                }}
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
              >
                Kelas Dewasa
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              size="small"
              columns={ColumsKelasDewasa}
              dataSource={KelasTahsinDewasas.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 1200,
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
