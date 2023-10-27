import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setTabsValue } from "../../store/action/tabs";

import {
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
  createPengajar,
  deletePengajar,
  updatePengajar,
  getAllPengajar,
  updateStatusPengajar,
  getOnePengajar,
} from "../../store/action/pengajar";

const TabPengajar = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Pengajars, Pengajar } = useSelector((state) => state.PengajarReducer);

  let [namaPengajar, setNamaPengajar] = useState("");
  let [teleponPengajar, setTeleponPengajar] = useState("");
  let [umurPengajar, setUmurPengajar] = useState("");
  let [alamatPengajar, setAlamatPengajar] = useState("");
  let [pekerjaanPengajar, setPekerjaanPengajar] = useState("");

  useEffect(() => {
    dispatch(getAllPengajar());
  }, []);

  useEffect(() => {
    setNamaPengajar(Pengajar?.data?.nama);
    setTeleponPengajar(Pengajar?.data?.telepon);
    setAlamatPengajar(Pengajar?.data?.alamat);
    setUmurPengajar(Pengajar?.data?.umur);
    setPekerjaanPengajar(Pengajar?.data?.pekerjaan);
  }, [Pengajar, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllPengajar());
    setNamaPengajar("");
    setTeleponPengajar("");
    setAlamatPengajar("");
    setUmurPengajar("");
    setPekerjaanPengajar("");
  };

  const actionPengajar = (id) => {
    let dataPengajar = {
      nama: namaPengajar,
      telepon: teleponPengajar,
      alamat: alamatPengajar,
      pekerjaan: pekerjaanPengajar,
      umur: umurPengajar,
    };

    dispatch(
      id ? updatePengajar(id, dataPengajar) : createPengajar(dataPengajar)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllPengajar());
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

  const handleSearch = async (value) => {
    await dispatch(getAllPengajar(value));
  };

  const ColumsPengajar = [
    {
      title: "Nama",
      align: "center",
      width: 250,
      render: (data) => {
        return data.nama;
      },
    },
    {
      title: "Telepon",
      align: "center",
      width: 200,
      render: (data) => {
        return data.telepon;
      },
    },
    {
      title: "Alamat",
      align: "center",
      width: 250,
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
        const dispatch = useDispatch();
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusPengajar(data.id, newStatus)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(
                  `Status ${newStatus ? "Aktif" : "Tidak Aktif"}`
                );
                dispatch(getAllPengajar());
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
        const handleMenuClick = (e, id) => {
          if (e.key === "edit") {
            dispatch(setTabsValue("updatePengajar"));
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
                dispatch(deletePengajar(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllPengajar());
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
          <Dropdown overlay={menu} trigger={["click"]}>
            <div>
              <a
                className="ant-dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <DownCircleOutlined className="text-lg text-slate-500" />
              </a>
            </div>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <div>
      {TabsValues === "TambahPengajar" || TabsValues === "updatePengajar" ? (
        <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex gap-3 items-center">
            <ArrowLeftOutlined
              className=" text-[16px]"
              onClick={() => {
                handleChangeTabs("");
                fetchData();
              }}
            />
            <p className="font-semibold text-[16px]">
              {TabsValues === "TambahPengajar"
                ? "Tambah Pengajar"
                : TabsValues === "updatePengajar"
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
                autoComplete="off"
                id="namaPengajar"
                placeholder="Masukkan Nama Pengajar"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Telepon</label>
              <Input
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                fetchData();
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
                TabsValues === "TambahPengajar"
                  ? () => actionPengajar()
                  : TabsValues === "updatePengajar"
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
              onSearch={handleSearch}
              style={{
                width: 400,
              }}
            />
            <Tooltip placement="top" title={"Tambahkan Pengajar Tahsin"}>
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahPengajar");
                  fetchData();
                }}
              >
                Pengajar
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsPengajar}
              size="small"
              dataSource={Pengajars.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 1400,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPengajar;
