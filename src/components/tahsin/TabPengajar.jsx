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
  addPengajar,
  deletePengajar,
  editPengajar,
  getAllPengajar,
  getOnePengajar,
} from "../../store/action/pengajar";

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
    setNamaPengajar(Pengajar?.data?.nama);
    setTeleponPengajar(Pengajar?.data?.telepon);
    setAlamatPengajar(Pengajar?.data?.alamat);
    setUmurPengajar(Pengajar?.data?.umur);
    setPekerjaanPengajar(Pengajar?.data?.pekerjaan);
  }, [Pengajar]);

  useEffect(() => {
    dispatch(getAllPengajar());

    setNamaPengajar("");
    setTeleponPengajar("");
    setAlamatPengajar("");
    setUmurPengajar("");
    setPekerjaanPengajar("");
  }, [TabsValues]);

  const actionPengajar = (id) => {
    let dataPengajar = {
      nama: namaPengajar,
      telepon: teleponPengajar,
      alamat: alamatPengajar,
      pekerjaan: pekerjaanPengajar,
      umur: umurPengajar,
    };

    dispatch(id ? editPengajar(id, dataPengajar) : addPengajar(dataPengajar))
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

  return (
    <div>
      {TabsValues == "TambahPengajar" || TabsValues == "EditPengajar" ? (
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

            <Tooltip placement="top" title={"Tambahkan Pengajar Tahsin"}>
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
                y: 480,
                x: 1200,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPengajar;
