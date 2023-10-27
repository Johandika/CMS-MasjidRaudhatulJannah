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
  getAllKelasTahsinAnak,
  getOneKelasTahsinAnak,
  addKelasTahsinAnak,
  deleteKelasTahsinAnak,
  updateStatusKelasTahsinAnak,
  updateKelasTahsinAnak,
} from "../../store/action/kelasTahsin";

const Hari = [
  { id: 1, nama: "Senin & Rabu" },
  { id: 2, nama: "Selasa & Kamis" },
  { id: 3, nama: "Jumat & Ahad" },
];

const TabKelasTahsinAnak = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const { Pengajars, Pengajar } = useSelector((state) => state.PengajarReducer);
  const { KelasTahsinAnaks, KelasTahsinAnak } = useSelector(
    (state) => state.KelasTahsinReducer
  );

  const [kelasAnak, setKelasAnak] = useState("");
  const [hariKelasAnak, setHariKelasAnak] = useState("");
  const [pengajarKelasAnak, setPengajarKelasAnak] = useState("");
  const [kuotaKelasAnak, setKuotaKelasAnak] = useState(0);
  const [catatanKelasAnak, setCatatanKelasAnak] = useState("");

  const actionKelasTahsinAnak = (id) => {
    let dataKelas = {
      hari: hariKelasAnak,
      kelas: kelasAnak,
      catatan: catatanKelasAnak,
      kuota: kuotaKelasAnak,
      PengajarTahsinId: pengajarKelasAnak,
      jumlah_peserta: 0,
    };

    dispatch(
      id ? updateKelasTahsinAnak(id, dataKelas) : addKelasTahsinAnak(dataKelas)
    ).then((data) => {
      message
        .loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllKelasTahsinAnak());
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
    setKelasAnak(KelasTahsinAnak?.data?.kelas);
    setHariKelasAnak(KelasTahsinAnak?.data?.Jadwal?.hari);
    setPengajarKelasAnak(KelasTahsinAnak?.data?.PengajarTahsin?.id);
    setKuotaKelasAnak(KelasTahsinAnak?.data?.kuota);
    setCatatanKelasAnak(KelasTahsinAnak?.data?.catatan);
  }, [KelasTahsinAnak]);

  useEffect(() => {
    dispatch(getAllKelasTahsinAnak());
  }, []);

  const fatchData = () => {
    dispatch(getAllKelasTahsinAnak());

    setKelasAnak("");
    setHariKelasAnak("");
    setPengajarKelasAnak("");
    setKuotaKelasAnak("");
    setCatatanKelasAnak("");
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };
  const handleSearch = (value) => {
    dispatch(getAllKelasTahsinAnak(value));
  };

  const ColumsKelasAnak = [
    {
      title: "Kelas",
      align: "center",
      render: (data) => {
        return data?.kelas;
      },
    },
    {
      title: "Pengajar",
      align: "center",
      render: (data) => {
        return data?.PengajarTahsin?.nama;
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
        const dispatch = useDispatch();
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusKelasTahsinAnak(data.id, newStatus)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(
                  `Status ${newStatus ? "Aktif" : "Tidak Aktif"}`
                );
                dispatch(getAllKelasTahsinAnak());
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
            dispatch(setTabsValue("updateKelasTahsinAnak"));
            dispatch(getOneKelasTahsinAnak(id));
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
                dispatch(deleteKelasTahsinAnak(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllKelasTahsinAnak());
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

  return (
    <div>
      {TabsValues == "TambahKelasAnak" ||
      TabsValues == "updateKelasTahsinAnak" ? (
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
              {TabsValues == "TambahKelasAnak"
                ? "Tambah kelas Tahsin Anak"
                : TabsValues == "updateKelasTahsinAnak"
                ? "Edit Kelas Tahsin Anak"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="kelasAnak">Nama Kelas</label>
              <Input
                value={kelasAnak}
                autoComplete="off"
                className="mt-[5px]"
                id="kelasAnak"
                placeholder="Masukkan Nama Kelas Tahsin Anak"
                onChange={(e) => setKelasAnak(e.target.value)}
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="pengajarTahsinAnak">Pengajar Tahsin</label>
              {Pengajars && Pengajars?.data?.length > 0 ? (
                <Select
                  id="pengajarTahsinAnak"
                  placeholder="Pilih Pengajar Tahsin"
                  value={pengajarKelasAnak ? pengajarKelasAnak : null}
                  className="mt-[5px]"
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
                  placeholder="Pilih Jadwal Kelas Tahsin"
                  value={hariKelasAnak ? hariKelasAnak : null}
                  className="mt-[5px]"
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
                className="w-full mt-[5px]"
                id="kuotaKelasAnak"
                placeholder="Masukkan Kuota Kelas Tahsin"
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="catatanKelasAnak">Catatan</label>
              <Input.TextArea
                rows={4}
                autoComplete="off"
                value={catatanKelasAnak}
                onChange={(e) => setCatatanKelasAnak(e.target.value)}
                className="mt-[5px]"
                id="catatanKelasAnak"
                placeholder="Masukkan Catatan"
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
                TabsValues == "TambahKelasAnak"
                  ? () => actionKelasTahsinAnak()
                  : TabsValues == "updateKelasTahsinAnak"
                  ? () => actionKelasTahsinAnak(KelasTahsinAnak.data.id)
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

            <Tooltip placement="top" title={"Tambahkan Kelas Tahsin Anak"}>
              <Button
                onClick={() => {
                  fatchData();
                  handleChangeTabs("TambahKelasAnak");
                }}
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
              >
                Kelas Anak
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              size="small"
              columns={ColumsKelasAnak}
              dataSource={KelasTahsinAnaks?.data}
              pagination={false}
              scroll={{
                y: 480,
              }}
              rowKey={KelasTahsinAnaks.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabKelasTahsinAnak;
