import { useEffect, useRef, useState } from "react";
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
  Space,
  DatePicker,
} from "antd";

import {
  PlusOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

import { formatWaktuArtikel } from "../utils/date";
import { config } from "../../configs";
import formatPathGambar from "../utils/formatGambar";
import moment from "moment";
import dayjs from "dayjs";
import {
  createPesertaDiklat,
  deletePesertaDiklat,
  getAllPesertaDiklat,
  getOnePesertaDiklat,
  updatePesertaDiklat,
  updateStatusPembayaranPesertaDiklat,
  updateStatusPesertaDiklat,
} from "../../store/action/pesertaDiklat";
import PesertaDiklatReducer from "../../store/reducer/pesertaDiklat";

const TabPesertaDiklat = () => {
  const dispatch = useDispatch();
  const target = useRef(null);

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { PesertaDiklats, PesertaDiklat } = useSelector(
    (state) => state.PesertaDiklatReducer
  );
  const { Diklats, Diklat } = useSelector((state) => state.DiklatReducer);

  let [nama, setNama] = useState("");
  let [telepon, setTelepon] = useState("");
  let [alamat, setAlamat] = useState("");
  let [pekerjaan, setPekerjaan] = useState("");
  let [umur, setUmur] = useState(0);
  let [statusPembayaran, setStatusPembayaran] = useState("BELUM_DIBAYAR");
  let [buktiBayarFile, setBuktiBayarFile] = useState(null);
  let [status, setStatus] = useState(true);
  let [showNamaPoster, setShowNamaPoster] = useState(null);
  let [diklatId, setDiklatId] = useState("");

  useEffect(() => {
    dispatch(getAllPesertaDiklat());
  }, []);

  useEffect(() => {
    setNama(PesertaDiklat?.data?.nama);
    setTelepon(PesertaDiklat?.data?.telepon);
    setAlamat(PesertaDiklat?.data?.alamat);
    setPekerjaan(PesertaDiklat?.data?.pekerjaan);
    setUmur(PesertaDiklat?.data?.umur);
    setStatusPembayaran(PesertaDiklat?.data?.status_pembayaran);
    setBuktiBayarFile(PesertaDiklat?.data?.file_bukti_pembayaran);
    setStatus(PesertaDiklat?.data?.status_aktif);
  }, [PesertaDiklat, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllPesertaDiklat());
    setNama("");
    setTelepon("");
    setAlamat("");
    setPekerjaan("");
    setUmur(0);
    setStatusPembayaran("");
    setBuktiBayarFile(null);
    setStatus(null);
  };

  const actionDiklat = (id) => {
    let dataPesertaDiklat = {
      nama: nama,
      telepon: telepon,
      alamat: alamat,
      pekerjaan: pekerjaan,
      umur: umur,
      status_pembayaran: statusPembayaran,
      file_bukti_pembayaran: buktiBayarFile,
      status_aktif: status,
    };

    if (buktiBayarFile === null) {
      alert("Poster kajian harus jpg,jpeg,png.");
      return;
    }

    console.log("dataPesertaDiklat", dataPesertaDiklat);
    dispatch(
      id
        ? updatePesertaDiklat(id, dataPesertaDiklat)
        : createPesertaDiklat(dataPesertaDiklat)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllPesertaDiklat());
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
    await dispatch(getAllPesertaDiklat(value));
  };

  const handleFileChange = async (e) => {
    const uploaded = e?.target?.files[0];
    setShowNamaPoster(uploaded?.name);

    if (
      uploaded?.type === "image/jpg" ||
      uploaded?.type === "image/png" ||
      uploaded?.type === "image/jpeg"
    ) {
      var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);
      if (size > 5) {
        alert("File kebesaran, size maximal 5MB");
      } else {
        setBuktiBayarFile(uploaded);
      }
    } else {
      alert("Anda harus menginput file jpg/jpeg/png");
    }
  };

  const handleClearFile = () => {
    setShowNamaPoster(null);
    setBuktiBayarFile(null);
  };

  const findDiklat = (diklatId) => {
    const diklat = Diklats.data.find((diklat) => diklat.id === diklatId);
    setDiklatId(diklat.id);
    return diklat.tema;
  };

  const ColumsDiklat = [
    {
      width: 200,
      align: "center",
      title: "Bukti Pembayaran",
      render: (data) => {
        if (data.file_bukti_pembayaran) {
          return (
            <div className="flex justify-center items-center">
              <img
                alt={`bukti pembayaran ${data.nama}`}
                src={`${config.api_host_dev}/${formatPathGambar(
                  data.file_bukti_pembayaran
                )}`}
                className=" w-16 h-16 rounded-lg object-cover border-2 border-gray-100 shadow-md "
              />
            </div>
          );
        } else {
          return (
            <div className="flex justify-center items-center">
              <div
                alt={`foto ${data.status_pembayaran}`}
                className="w-16 h-16 rounded-lg border-2 bg-slate-50 border-gray-100
              shadow-md flex justify-center items-center"
              >
                <p className="text-center text-xs font-medium text-slate-400">
                  Empty
                </p>
              </div>
            </div>
          );
        }
      },
    },
    {
      title: "Nama",
      align: "center",
      width: 200,
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
      title: "Diklat",
      align: "center",
      width: 200,
      render: (data) => {
        return findDiklat(data.DiklatId);
      },
    },
    {
      title: "Alamat",
      align: "center",
      width: 200,
      render: (data) => {
        return data.alamat;
      },
    },
    {
      title: "Pekerjaan",
      align: "center",
      width: 200,
      render: (data) => {
        return data.pekerjaan;
      },
    },
    {
      title: "Umur",
      align: "center",
      width: 150,
      render: (data) => {
        return data.umur;
      },
    },
    {
      title: "Status Pembayaran",
      width: 150,
      align: "center",
      render: (data) => {
        const handleStatusChange = (newStatus) => {
          dispatch(
            updateStatusPembayaranPesertaDiklat(data.id, newStatus)
          ).then((response) => {
            if (response.statusCode === 200) {
              message.success(
                `Status ${newStatus ? "BELUM_VERIFIKASI" : "BELUM_DIBAYAR"}`
              );
              dispatch(getAllPesertaDiklat());
            } else {
              message.error(response.message);
            }
          });
        };

        const menu = (
          <Menu className="w-28">
            <Menu.Item
              key="aktif"
              onClick={() => handleStatusChange(true)}
            >
              BELUM_VERIFIKASI
            </Menu.Item>
            <Menu.Item
              key="tidak-aktif"
              onClick={() => handleStatusChange(false)}
            >
              BELUM_DIBAYAR
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
                {data.status_pembayaran ? (
                  <Tag color="success">Belum Verifikasi</Tag>
                ) : (
                  <Tag
                    color="error"
                    style={{ color: "red" }}
                  >
                    Belum Dibayar
                  </Tag>
                )}
              </div>
            </a>
          </Dropdown>
        );
      },
    },
    {
      title: "Status Aktif",
      width: 150,
      align: "center",
      render: (data) => {
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusPesertaDiklat(data.id, newStatus)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(
                  `Status ${newStatus ? "Aktif" : "Tidak Aktif"}`
                );
                dispatch(getAllPesertaDiklat());
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
        const handleMenuClick = (e, id) => {
          if (e.key === "edit") {
            dispatch(setTabsValue("UpdatePesertaDiklat"));
            dispatch(getOnePesertaDiklat(id));
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
                dispatch(deletePesertaDiklat(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllPesertaDiklat());
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
      {TabsValues === "TambahPesertaDiklat" ||
      TabsValues === "UpdatePesertaDiklat" ? (
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
              {TabsValues === "TambahPesertaDiklat"
                ? "Tambah Peserta Diklat"
                : TabsValues === "UpdatePesertaDiklat"
                ? "Edit Peserta Diklat"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between  overflow-auto max-h-[480px]">
            <div className="w-[45%] mb-5 flex flex-col gap-1">
              <label htmlFor="uploadPosterDiklat">Upload Bukti Bayar</label>
              <div className=" gap-2">
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => target.current.click()}
                  id="uploadPosterDiklat"
                >
                  Upload Poster
                </Button>
                {showNamaPoster !== null && (
                  <div className="flex flex-row ">
                    <div className="mr-3  text-blue-700">{showNamaPoster}</div>
                    <div className="text-red-500">
                      <CloseCircleOutlined onClick={handleClearFile} />
                    </div>
                  </div>
                )}
                <input
                  ref={target}
                  multiple={false}
                  type="file"
                  name="uploadPosterDiklat"
                  onChange={handleFileChange}
                  className="hidden"
                  id="uploadPosterDiklat"
                />
              </div>
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="nama">Nama</label>
              <Input
                autoComplete="off"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="mt-[5px]  w-full"
                id="nama"
                placeholder="Masukkan Nama Peserta Diklat"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="telepon">Telepon</label>
              <Input
                autoComplete="off"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="mt-[5px]  w-full"
                id="telepon"
                placeholder="Masukkan Nomor Telepon"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="alamat">Alamat</label>
              <Input
                autoComplete="off"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="mt-[5px]  w-full"
                id="alamat"
                placeholder="Masukkan Alamat"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="alamat">Pekerjaan</label>
              <Input
                autoComplete="off"
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
                className="mt-[5px]  w-full"
                id="alamat"
                placeholder="Masukkan Pekerjaan"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="umur">Umur</label>
              <InputNumber
                value={umur}
                onChange={(value) => setUmur(value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="umur"
                placeholder="Masukkan Umur"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="diklat">Pilih Diklat</label>
              {Diklats && Diklats?.data?.length > 0 ? (
                <Select
                  id="diklat"
                  className="mt-[5px]"
                  value={diklatId ? diklatId : null}
                  placeholder="Pilih Diklat"
                  onChange={(value) => setDiklatId(value)}
                >
                  {Diklats?.data.map((diklat) => (
                    <Option
                      key={diklat?.id}
                      value={diklat?.id}
                    >
                      {diklat?.tema}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>kajian Tahsin Belum Ada</div>
              )}
            </div>

            <div className="flex gap-3 justify-end w-full">
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
                  TabsValues === "TambahPesertaDiklat"
                    ? () => actionDiklat()
                    : TabsValues === "UpdatePesertaDiklat"
                    ? () => actionDiklat(PesertaDiklat.data.id)
                    : null
                }
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <Search
              placeholder="Masukkan Nama Diklat/Penanggung Jawab"
              onSearch={handleSearch}
              style={{
                width: 400,
              }}
            />
            <Tooltip
              placement="top"
              title={"Tambahkan Diklat"}
            >
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahPesertaDiklat");
                  fetchData();
                }}
              >
                Diklat
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsDiklat}
              size="small"
              dataSource={PesertaDiklats.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 1400,
              }}
              rowKey={PesertaDiklats.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPesertaDiklat;
