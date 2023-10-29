import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  message,
  Table,
  Input,
  Button,
  Tooltip,
  InputNumber,
  Menu,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const { Search } = Input;

import {
  createRekening,
  createUangMasuk,
  deleteRekening,
  getAllRekening,
  getOneRekening,
  updateRekening,
} from "../../store/action/rekening";
import ubahFormatDate from "../../components/utils/date";
import { setTabsValue } from "../../store/action/tabs";
import Swal from "sweetalert2";

const TabUangKeluar = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Rekenings, Rekening } = useSelector((state) => state.RekeningReducer);

  let [namaRekening, setNamaRekening] = useState("");
  let [nomorRekening, setNomorRekening] = useState("");
  let [saldo, setSaldo] = useState(null);
  let [catatan, setCatatan] = useState("");
  let [namaBank, setNamaBank] = useState("");

  let [total, setTotal] = useState(null);
  let [waktu, setWaktu] = useState(null);
  let [keterangan, setKeterangan] = useState("");
  let [informasi, setInformasi] = useState("");
  let [rekeningDonasi, setRekeningDonasi] = useState("");

  const handleUangMasukSubmit = (uangMasukData) => {
    dispatch(createUangMasuk(uangMasukData))
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllRekening());
              handleChangeTabs("");
            });
          } else {
            message.error(data.response.data.message);
          }
        })
      )
      .catch((error) => console.log(error));
    setUangMasukModalVisible(false);
  };

  useEffect(() => {
    dispatch(getAllRekening());
  }, []);

  useEffect(() => {
    setNamaRekening(Rekening?.data?.atas_nama);
    setNomorRekening(Rekening?.data?.nomor_rekening);
    setSaldo(Rekening?.data?.saldo);
    setCatatan(Rekening?.data?.catatan);
    setNamaBank(Rekening?.data?.nama_bank);
  }, [Rekening, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllRekening());
    setNamaRekening("");
    setNomorRekening("");
    setSaldo(null);
    setCatatan(
      "Jazzakumullahu Khairan bagi saudara/i yang sudah berkontribusi memberika sebagian hartanya untuk keperluan Masjid Raudhatul Jannah"
    );
    setNamaBank("");
  };

  const actionRekening = (id) => {
    let dataRekening = {
      atas_nama: namaRekening,
      nomor_rekening: nomorRekening,
      saldo: saldo,
      catatan: catatan,
      nama_bank: namaBank,
    };

    dispatch(
      id ? updateRekening(id, dataRekening) : createRekening(dataRekening)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllRekening());
              handleChangeTabs("");
            });
          } else {
            message.error(data.response.data.message);
          }
        })
      )
      .catch((error) => console.log(error));
  };

  const handleSearch = async (value) => {
    await dispatch(getAllRekening(value));
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  const ColumnsRekening = [
    {
      width: 200,
      align: "center",
      title: "Nama Rekening",
      render: (data) => {
        return data.atas_nama;
      },
    },
    {
      width: 200,
      align: "center",
      title: "Nomor Rekening",
      render: (data) => {
        return data.nomor_rekening;
      },
    },
    {
      width: 200,
      title: "Catatan",
      align: "center",
      render: (data) => {
        return data.catatan;
      },
    },
    {
      width: 200,
      title: "Saldo",
      align: "center",
      render: (data) => {
        return `Rp.${data.saldo}`;
      },
    },
    {
      width: 200,
      title: "Terakhir di Update",
      align: "center",
      render: (data) => {
        return ubahFormatDate(data.updatedAt);
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
            dispatch(setTabsValue("updateRekening"));
            dispatch(getOneRekening(id));
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
                dispatch(deleteRekening(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllRekening());
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
          <Dropdown
            overlay={menu}
            trigger={["click"]}
          >
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
      {TabsValues === "TambahRekening" || TabsValues === "updateRekening" ? (
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
              {TabsValues === "TambahRekening"
                ? "Tambah Rekening"
                : TabsValues === "updateRekening"
                ? "Edit Rekening"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaPengajar">Nama Rekening</label>
              <Input
                value={namaRekening}
                onChange={(e) => setNamaRekening(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="namaRekening"
                placeholder="Masukkan Nama Rekening"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Nomor Rekening</label>
              <Input
                autoComplete="off"
                value={nomorRekening !== null ? nomorRekening : null}
                onChange={(e) => setNomorRekening(e.target.value)}
                className="mt-[5px]  w-full"
                id="nomorRekening"
                placeholder="Masukkan Nomor Rekening"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Nama Bank</label>
              <Input
                autoComplete="off"
                value={namaBank}
                onChange={(e) => setNamaBank(e.target.value)}
                className="mt-[5px]  w-full"
                id="nomorRekening"
                placeholder="Masukkan Nama Bank"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Catatan</label>
              <Input
                autoComplete="off"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="mt-[5px]  w-full"
                id="nomorRekening"
                placeholder="Masukkan Catatan"
              />
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="umurPengajar">Saldo</label>
              <InputNumber
                value={saldo}
                onChange={(value) => setSaldo(value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="saldoRekening"
                placeholder="Masukkan Saldo Rekening"
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
                TabsValues === "TambahRekening"
                  ? () => actionRekening()
                  : TabsValues === "updateRekening"
                  ? () => actionRekening(Rekening.data.id)
                  : null
              }
            >
              Simpan
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex justify-between">
              <Search
                placeholder="Masukkan Nama/Telepon"
                onSearch={handleSearch}
                style={{
                  width: 400,
                }}
              />

              <Tooltip
                placement="top"
                title={"Tambahkan Rekening Baru"}
              >
                <Button
                  icon={<PlusOutlined />}
                  className="bg-primaryLight text-white"
                  onClick={() => {
                    handleChangeTabs("TambahRekening");
                    fetchData();
                  }}
                >
                  Rekening
                </Button>
              </Tooltip>
            </div>
            <div>
              <Table
                columns={ColumnsRekening}
                size="small"
                dataSource={Rekenings.data}
                pagination={false}
                scroll={{
                  y: 440,
                }}
                rowKey={Rekenings.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabUangKeluar;
