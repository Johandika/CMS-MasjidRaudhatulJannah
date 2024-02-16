import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setTabsValue } from "../../store/action/tabs";

import {
  Table,
  Input,
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

import {
  createDiklat,
  deleteDiklat,
  getAllDiklat,
  getOneDiklat,
  updateDiklat,
} from "../../store/action/diklat";
import { formatWaktuArtikel } from "../utils/date";
import { config } from "../../configs";
import formatPathGambar from "../utils/formatGambar";
import moment from "moment";
import dayjs from "dayjs";

const TemaDiklat = [
  { id: 1, value: "DIKLAT_JENAZAH", nama: "Diklat Penyelenggaraan Jenazah" },
  { id: 2, value: "DIKLAT_PRANIKAH", nama: "Diklat Pra Nikah" },
  { id: 3, value: "DIKLAT_SHOLAT", nama: "Diklat Shalat" },
];

const TabDiklat = () => {
  const dispatch = useDispatch();
  const target = useRef(null);

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Diklats, Diklat } = useSelector((state) => state.DiklatReducer);

  let [tema, setTema] = useState("");
  let [pemateri, setPemateri] = useState("");
  let [biaya, setBiaya] = useState(0);
  let [catatan, setCatatan] = useState("");
  let [kuota, setKuota] = useState(0);
  let [lokasi, setLokasi] = useState("");
  let [fasilitas, setFasilitas] = useState("");
  let [posterDiklat, setPosterDiklat] = useState(null);
  let [waktu, setWaktu] = useState(null);
  let [showNamaPoster, setShowNamaPoster] = useState(null);

  useEffect(() => {
    dispatch(getAllDiklat());
  }, []);

  useEffect(() => {
    setPemateri(Diklat?.data?.pemateri);
    setBiaya(Diklat?.data?.biaya);
    setCatatan(Diklat?.data?.catatan);
    setKuota(Diklat?.data?.kuota);
    setLokasi(Diklat?.data?.lokasi);
    setFasilitas(Diklat?.data?.fasilitas);
    setPosterDiklat(Diklat?.data?.poster_diklat || null);
    setWaktu(moment(Diklat?.data?.waktu));
    setTema(Diklat?.data?.tema);
  }, [Diklat, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllDiklat());
    setPemateri("");
    setBiaya(0);
    setCatatan("");
    setKuota(0);
    setLokasi("");
    setFasilitas("");
    setPosterDiklat(null);
    setWaktu(null);
    setTema("");
  };

  const actionDiklat = (id) => {
    let dataDiklat = {
      tema: tema,
      waktu: waktu,
      pemateri: pemateri,
      biaya: biaya,
      catatan: catatan,
      kuota: kuota,
      poster_diklat: posterDiklat,
      lokasi: lokasi,
      fasilitas: fasilitas,
    };

    if (posterDiklat === null) {
      alert("Poster kajian harus jpg,jpeg,png.");
      return;
    }

    dispatch(id ? updateDiklat(id, dataDiklat) : createDiklat(dataDiklat))
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllDiklat());
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
    await dispatch(getAllDiklat(value));
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
        setPosterDiklat(uploaded);
      }
    } else {
      alert("Anda harus menginput file jpg/jpeg/png");
    }
  };

  const handleClearFile = () => {
    setShowNamaPoster(null);
    setPosterDiklat(null);
  };

  const onChange = (value, dateString) => {
    setWaktu(value);
  };
  const onOk = (value) => {
    setWaktu(value);
  };

  const ColumsDiklat = [
    {
      width: 200,
      align: "center",
      title: "Poster Kajian",
      render: (data) => {
        if (data.poster_diklat) {
          return (
            <div className="flex justify-center items-center">
              <img
                alt={`foto ${data.tema}`}
                src={`${config.api_host_dev}/${formatPathGambar(
                  data.poster_diklat
                )}`}
                className=" w-16 h-16 rounded-lg object-cover border-2 border-gray-100 shadow-md "
              />
            </div>
          );
        } else {
          return (
            <div className="flex justify-center items-center">
              <div
                alt={`foto ${data.tema}`}
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
      title: "Tema",
      align: "center",
      width: 200,
      render: (data) => {
        return data.tema;
      },
    },
    {
      title: "Pemateri",
      align: "center",
      width: 200,
      render: (data) => {
        return data.pemateri;
      },
    },
    {
      title: "Waktu",
      align: "center",
      width: 300,
      render: (data) => {
        return formatWaktuArtikel(data.waktu);
      },
    },
    {
      title: "Biaya",
      align: "center",
      width: 200,
      render: (data) => {
        return data.biaya.toLocaleString("id-ID");
      },
    },
    {
      title: "Kuota",
      align: "center",
      width: 150,
      render: (data) => {
        return data.kuota;
      },
    },
    {
      title: "Lokasi",
      align: "center",
      width: 300,
      render: (data) => {
        return data.lokasi;
      },
    },
    {
      title: "Fasilitas",
      align: "center",
      width: 250,
      render: (data) => {
        return data.fasilitas;
      },
    },
    {
      title: "Catatan",
      align: "center",
      width: 250,

      render: (data) => {
        return data.catatan;
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
            dispatch(setTabsValue("UpdateDiklat"));
            dispatch(getOneDiklat(id));
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
                dispatch(deleteDiklat(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllDiklat());
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
      {TabsValues === "TambahDiklat" || TabsValues === "UpdateDiklat" ? (
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
              {TabsValues === "TambahDiklat"
                ? "Tambah Diklat"
                : TabsValues === "UpdateDiklat"
                ? "Edit Diklat"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between  overflow-auto max-h-[480px]">
            <div className="w-[45%] mb-5 flex flex-col gap-1">
              <label htmlFor="uploadPosterDiklat">Upload Poster</label>
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
                    <div className="mr-3  text-primaryLight">
                      {showNamaPoster}
                    </div>
                    <div className="text-red-500">
                      <CloseCircleOutlined onClick={handleClearFile} />
                    </div>
                  </div>
                )}
                <input
                  ref={target}
                  multiple={false}
                  type="file"
                  name="poster_kajian"
                  onChange={handleFileChange}
                  className="hidden"
                  id="posterDiklat"
                />
              </div>
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="jadwalKelasDewasa">Tema</label>
              {TemaDiklat && TemaDiklat?.length > 0 ? (
                <Select
                  id="jadwalKelasDewasa"
                  className="mt-[5px]"
                  value={tema ? tema : null}
                  placeholder="Pilih Hari Kajian"
                  onChange={(value) => setTema(value)}
                >
                  {TemaDiklat?.map((tema) => (
                    <Option
                      key={tema?.id}
                      value={tema?.value}
                    >
                      {tema?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Diklat belum ada ...</div>
              )}
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="pemateri">Pemateri</label>
              <Input
                autoComplete="off"
                value={pemateri}
                onChange={(e) => setPemateri(e.target.value)}
                className="mt-[5px]  w-full"
                id="pemateri"
                placeholder="Masukkan Nama Pemateri"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="waktu">Waktu</label>

              <Space
                direction="vertical"
                size={12}
              >
                <DatePicker
                  value={waktu ? dayjs(waktu) : null}
                  showTime
                  onChange={onChange}
                  onOk={onOk}
                />
              </Space>
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="biayaDiklat">Biaya</label>
              <InputNumber
                value={(biaya = !null ? biaya : "")}
                onChange={(value) => setBiaya(value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="biayaDiklat"
                placeholder="Masukkan Biaya Diklat"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="kuoatDiklat">Kuota</label>
              <InputNumber
                value={kuota != null ? kuota : ""}
                onChange={(value) => setKuota(value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="kuoatDiklat"
                placeholder="Set Kuota Diklat"
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="fasilitas">Lokasi</label>
              <Input.TextArea
                autoComplete="off"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="mt-[5px]  w-full"
                id="fasilitas"
                rows={2}
                placeholder="Masukkan Informasi Lokasi"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="fasilitas">Fasilitas</label>
              <Input.TextArea
                autoComplete="off"
                value={fasilitas}
                onChange={(e) => setFasilitas(e.target.value)}
                className="mt-[5px]  w-full"
                id="fasilitas"
                rows={2}
                placeholder="Masukkan Informasi Fasilitas"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="catatan">Catatan</label>
              <Input.TextArea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={5}
                id="catatan"
                placeholder="Masukkan Catatan"
              />
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
                  TabsValues === "TambahDiklat"
                    ? () => actionDiklat()
                    : TabsValues === "UpdateDiklat"
                    ? () => actionDiklat(Diklat.data.id)
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
                  handleChangeTabs("TambahDiklat");
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
              dataSource={Diklats.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 1400,
              }}
              rowKey={Diklats.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabDiklat;
