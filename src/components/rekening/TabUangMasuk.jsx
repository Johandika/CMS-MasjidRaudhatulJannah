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
  DatePicker,
  Select,
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
const { Option } = Select;

import {
  getAllUangMasuk,
  getOneUangMasuk,
  createUangMasuk,
  updateUangMasuk,
  deleteUangMasuk,
  getAllRekening,
} from "../../store/action/rekening";
import ubahFormatDate from "../../components/utils/date";
import { setTabsValue } from "../../store/action/tabs";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import numberWithCommas from "../../helper/numberWithCommas";

const TabUangMasuk = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Rekenings, Rekening, UangMasuks, UangMasuk } = useSelector(
    (state) => state.RekeningReducer
  );

  let [total, setTotal] = useState(null);
  let [waktu, setWaktu] = useState(null);
  let [keterangan, setKeterangan] = useState("");
  let [informasi, setInformasi] = useState("");
  let [rekeningDonasi, setRekeningDonasi] = useState(null);

  useEffect(() => {
    dispatch(getAllUangMasuk());
  }, []);

  useEffect(() => {
    setTotal(UangMasuk?.data?.total);
    setWaktu(UangMasuk?.data?.waktu);
    setKeterangan(UangMasuk?.data?.keterangan);
    setInformasi(UangMasuk?.data?.informasi);
    setRekeningDonasi(UangMasuk?.data?.RekeningDonasi?.id);
  }, [UangMasuk, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllUangMasuk());
    setTotal("");
    setWaktu(null);
    setKeterangan(null);
    setInformasi("");
    setRekeningDonasi("");
  };

  const actionUangMasuk = (id) => {
    let dataUangMasuk = {
      total: total,
      waktu: waktu,
      keterangan: keterangan,
      informasi: informasi,
      RekeningDonasiId: rekeningDonasi,
    };

    dispatch(
      id ? updateUangMasuk(id, dataUangMasuk) : createUangMasuk(dataUangMasuk)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllUangMasuk());
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
    await dispatch(getAllUangMasuk(value));
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  const ColumnsUangMasuk = [
    {
      width: 200,
      align: "center",
      title: "Nama Rekening",
      render: (data) => {
        return data?.RekeningDonasi?.atas_nama;
      },
    },
    {
      width: 200,
      title: "Nomor Rekening",
      align: "center",
      render: (data) => {
        return data?.RekeningDonasi?.nomor_rekening;
      },
    },
    {
      width: 200,
      title: "Total",
      align: "center",
      render: (data) => {
        return `Rp. ${numberWithCommas(data.total)}`;
      },
    },
    {
      width: 200,
      title: "Waktu",
      align: "center",
      render: (data) => {
        return ubahFormatDate(data.waktu);
      },
    },
    {
      width: 200,
      title: "Keterangan",
      align: "center",
      render: (data) => {
        return data.keterangan;
      },
    },
    {
      width: 200,
      title: "Informasi",
      align: "center",
      render: (data) => {
        return data.informasi;
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
            dispatch(setTabsValue("updateUangMasuk"));
            dispatch(getOneUangMasuk(id));
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
                dispatch(deleteUangMasuk(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllUangMasuk());
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

  const handleFilterRekening = (value) => {
    dispatch(getAllUangMasuk(value));
  };

  return (
    <div>
      {TabsValues === "TambahUangMasuk" || TabsValues === "updateUangMasuk" ? (
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
              {TabsValues === "TambahUangMasuk"
                ? "Tambah Uang Masuk"
                : TabsValues === "updateUangMasuk"
                ? "Edit Uang Masuk"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="totalUangMasuk">Total Uang Masuk</label>
              <InputNumber
                value={total}
                onChange={(value) => setTotal(value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="totalUangMasuk"
                placeholder="Masukkan Total Uang Masuk"
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="waktuUangMasuk">Waktu</label>
              <DatePicker
                value={waktu ? dayjs(waktu) : null}
                x
                onChange={(date, dateString) => setWaktu(date)}
                className="mt-[5px] w-full"
                id="waktuUangMasuk"
                placeholder="Masukkan Waktu"
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="KeteranganUangMasuk">Keterangan</label>
              <Input
                autoComplete="off"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="mt-[5px]  w-full"
                id="KeteranganUangMasuk"
                placeholder="Masukkan Keterangan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="informasiUangMasuk">Informasi</label>
              <Input
                autoComplete="off"
                value={informasi}
                onChange={(e) => setInformasi(e.target.value)}
                className="mt-[5px]  w-full"
                id="informasiUangMasuk"
                placeholder="Masukkan Informasi"
              />
            </div>
          </div>

          <div className="w-[45%] mb-5 flex flex-col">
            <label htmlFor="RekeningDonasiMasuk">RekeningDonasi</label>
            {Rekenings && Rekenings?.data?.length > 0 ? (
              <Select
                id="RekeningDonasiMasuk"
                className="mt-[5px]"
                value={rekeningDonasi ? rekeningDonasi : null}
                placeholder="Pilih Rekening"
                onChange={(value) => setRekeningDonasi(value)}
                disabled={TabsValues == "updateUangMasuk"}
              >
                {Rekenings?.data.map((rekening) => (
                  <Option key={rekening?.id} value={rekening?.id}>
                    {rekening?.atas_nama}
                  </Option>
                ))}
              </Select>
            ) : (
              <div>Rekening Kosong</div>
            )}
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
                TabsValues === "TambahUangMasuk"
                  ? () => actionUangMasuk()
                  : TabsValues === "updateUangMasuk"
                  ? () => actionUangMasuk(UangMasuk.data.id)
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
              <div className="w-[45%] flex flex-col">
                {Rekenings && Rekenings?.data?.length > 0 ? (
                  <Select
                    className="w-60"
                    placeholder="Pilih Rekening"
                    onChange={(value) => handleFilterRekening(value)}
                  >
                    <Option value={null}>Pilih Rekening</Option>
                    {Rekenings?.data.map((rekening) => (
                      <Option key={rekening?.id} value={rekening?.id}>
                        {rekening?.atas_nama}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <div>Rekening Kosong</div>
                )}
              </div>

              <Tooltip placement="top" title={"Tambahkan Uang Masuk Baru"}>
                <Button
                  icon={<PlusOutlined />}
                  className="bg-primaryLight text-white"
                  onClick={() => {
                    handleChangeTabs("TambahUangMasuk");
                    fetchData();
                  }}
                >
                  Uang Masuk
                </Button>
              </Tooltip>
            </div>
            <div>
              <Table
                columns={ColumnsUangMasuk}
                size="small"
                dataSource={UangMasuks.data}
                pagination={false}
                scroll={{
                  y: 440,
                }}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabUangMasuk;
