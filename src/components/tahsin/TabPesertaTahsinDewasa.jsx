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
  getAllPesertaTahsinDewasa,
  getOnePesertaTahsinDewasa,
  createPesertaTahsinDewasa,
  updatePesertaTahsinDewasa,
  updateStatusPesertaTahsinDewasa,
  deletePesertaTahsinDewasa,
} from "../../store/action/pesertaTahsin";
import {
  createKelasTahsinDewasa,
  getAllKelasTahsinDewasa,
} from "../../store/action/kelasTahsin";

const TabPesertaTahsinDewasa = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const { PesertaTahsinDewasa, PesertaTahsinDewasas } = useSelector(
    (state) => state.PesertaTahsinReducer
  );

  const { KelasTahsinDewasas } = useSelector(
    (state) => state.KelasTahsinReducer
  );

  const [namaPeserta, setNamaPeserta] = useState("");
  const [teleponPeserta, setTeleponPeserta] = useState("");
  const [alamatPeserta, setAlamatPeserta] = useState("");
  const [pekerjaanPeserta, setPekerjaanPeserta] = useState("");
  const [umurPeserta, setUmurPeserta] = useState("");
  const [kelasTahsinDewasa, setKelasTahsinDewasa] = useState("");

  const fatchData = () => {
    dispatch(getAllKelasTahsinDewasa());

    setNamaPeserta("");
    setTeleponPeserta("");
    setAlamatPeserta("");
    setPekerjaanPeserta("");
    setUmurPeserta("");
    setKelasTahsinDewasa("");
  };

  useEffect(() => {
    setNamaPeserta(PesertaTahsinDewasa?.data?.nama);
    setTeleponPeserta(PesertaTahsinDewasa?.data?.telepon);
    setAlamatPeserta(PesertaTahsinDewasa?.data?.alamat);
    setPekerjaanPeserta(PesertaTahsinDewasa?.data?.pekerjaan);
    setUmurPeserta(PesertaTahsinDewasa?.data?.umur);
    setKelasTahsinDewasa(PesertaTahsinDewasa?.data?.KelasTahsinDewasa?.id);
  }, [PesertaTahsinDewasa]);

  useEffect(() => {
    dispatch(getAllPesertaTahsinDewasa());
    dispatch(getAllKelasTahsinDewasa());
  }, []);

  const ColumsPesertaDewasa = [
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
      title: "Kelas",
      align: "center",
      render: (data) => {
        return data.KelasTahsinDewasa.kelas;
      },
    },
    {
      title: "Status Aktif",
      align: "center",
      render: (data) => {
        const dispatch = useDispatch();
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusPesertaTahsinDewasa(data.id, newStatus)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(
                  `Status ${newStatus ? "Aktif" : "Tidak Aktif"}`
                );
                dispatch(getAllPesertaTahsinDewasa());
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
            dispatch(setTabsValue("UpdatePesertaDewasa"));
            dispatch(getOnePesertaTahsinDewasa(id));
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
                dispatch(deletePesertaTahsinDewasa(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllPesertaTahsinDewasa());
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

  const actionPesertaTahsin = (id) => {
    let dataPesertaDewasa = {
      nama: namaPeserta,
      telepon: teleponPeserta,
      alamat: alamatPeserta,
      pekerjaan: pekerjaanPeserta,
      umur: umurPeserta,
      KelasTahsinDewasaId: kelasTahsinDewasa,
    };

    dispatch(
      id
        ? updatePesertaTahsinDewasa(id, dataPesertaDewasa)
        : createPesertaTahsinDewasa(dataPesertaDewasa)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllPesertaTahsinDewasa());
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

  const handelSearch = (value) => {
    dispatch(getAllPesertaTahsinDewasa(value));
  };

  return (
    <div>
      {TabsValues == "TambahPesertaDewasa" ||
      TabsValues == "UpdatePesertaDewasa" ? (
        <div className="w-full flex flex-col gap-5 p-5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex gap-2 items-center">
            <ArrowLeftOutlined
              className=" text-[16px]"
              onClick={() => {
                handleChangeTabs("");
              }}
            />
            <p className="font-semibold text-[16px]">Tambah Peserta Dewasa</p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaPesertaDewasa">Nama</label>
              <Input
                className="mt-[5px]"
                id="namaPesertaDewasa"
                placeholder="Masukkan Nama"
                value={namaPeserta}
                autoComplete="off"
                onChange={(e) => setNamaPeserta(e.target.value)}
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="umurPesertaDewasa">Umur</label>
              <Input
                className="mt-[5px]"
                id="umurPesertaDewasa"
                placeholder="Masukkan Umur"
                value={umurPeserta}
                autoComplete="off"
                onChange={(e) => setUmurPeserta(e.target.value)}
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="pekerjaanDewasa">Pekerjaan</label>
              <Input
                className="mt-[5px]"
                id="pekerjaanDewasa"
                placeholder="Masukkan Pekerjaan"
                value={pekerjaanPeserta}
                autoComplete="off"
                onChange={(e) => setPekerjaanPeserta(e.target.value)}
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPesertaDewasa">Telepon</label>
              <Input
                className="mt-[5px]"
                id="teleponPesertaDewasa"
                placeholder="Masukkan Telepon"
                value={teleponPeserta}
                autoComplete="off"
                onChange={(e) => setTeleponPeserta(e.target.value)}
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="alamatPesertaDewasa">Alamat</label>
              <Input.TextArea
                className="mt-[5px]"
                id="alamatPesertaDewasa"
                placeholder="Masukkan Alamat"
                value={alamatPeserta}
                rows={4}
                autoComplete="off"
                onChange={(e) => setAlamatPeserta(e.target.value)}
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="KelasTahsinDewasa">Kelas Tahsin</label>
              {KelasTahsinDewasas && KelasTahsinDewasas?.data?.length > 0 ? (
                <Select
                  id="KelasTahsinDewasa"
                  className="mt-[5px]"
                  value={kelasTahsinDewasa ? kelasTahsinDewasa : null}
                  placeholder="Pilih Kelas Tahsin"
                  onChange={(value) => setKelasTahsinDewasa(value)}
                >
                  {KelasTahsinDewasas?.data.map((kelas) => (
                    <Option key={kelas?.id} value={kelas?.id}>
                      {kelas?.kelas}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Pengajar Tahsin Belum Ada</div>
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
                TabsValues === "TambahPesertaDewasa"
                  ? () => actionPesertaTahsin()
                  : TabsValues === "UpdatePesertaDewasa"
                  ? () => actionPesertaTahsin(PesertaTahsinDewasa.data.id)
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
              placeholder="Masukkan Nama/Telepon"
              onSearch={handelSearch}
              style={{
                width: 400,
              }}
            />

            <Tooltip placement="top" title={"Tambahkan Peserta Tahsin Dewasa"}>
              <Button
                onClick={() => {
                  handleChangeTabs("TambahPesertaDewasa");
                  fatchData();
                }}
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
              >
                Peserta Dewasa
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              size="small"
              columns={ColumsPesertaDewasa}
              dataSource={PesertaTahsinDewasas.data}
              pagination={false}
              scroll={{
                y: 400,
              }}
              rowKey={PesertaTahsinDewasas.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPesertaTahsinDewasa;
