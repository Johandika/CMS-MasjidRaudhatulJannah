import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  Input,
  Button,
  Tooltip,
  Menu,
  Dropdown,
  message,
  Select,
} from "antd";

import {
  PlusOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import { setTabsValue } from "../../store/action/tabs";
import Swal from "sweetalert2";

import {
  createKajian,
  deleteKajian,
  getAllKajianRutin,
  getAllKategoriKajian,
  getOneKajian,
  updateKajian,
} from "../../store/action/kajian";
import { config } from "../../configs";
import formatPathGambar from "../utils/formatGambar";

const { Search } = Input;
const { Option } = Select;

const Hari = [
  { id: 1, nama: "Senin" },
  { id: 2, nama: "Selasa" },
  { id: 3, nama: "Rabu" },
  { id: 4, nama: "kamis" },
  { id: 5, nama: "Jum'at" },
  { id: 6, nama: "Sabtu" },
  { id: 7, nama: "Ahad" },
];

const TabKajianRutin = () => {
  const dispatch = useDispatch();
  const target = useRef(null);

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { KajianRutins, Kajian, KategoriKajians } = useSelector(
    (state) => state.KajianReducer
  );
  const { Ustadzs } = useSelector((state) => state.UstadzReducer);

  let tipe = "RUTIN";
  let [waktu, setWaktu] = useState("");
  let [tema, setTema] = useState("");
  let [catatan, setCatatan] = useState("");
  let [kategoriId, setKategoriId] = useState("");
  let [ustadzId, setUstadzId] = useState("");
  let [hari, setHari] = useState("");
  let [posterKajian, setPosterKajian] = useState(null);
  let [showNamaPoster, setShowNamaPoster] = useState(null);

  useEffect(() => {
    dispatch(getAllKajianRutin());
    dispatch(getAllKategoriKajian());
  }, []);

  useEffect(() => {
    setWaktu(Kajian?.data?.waktu_kajian_rutin);
    setTema(Kajian?.data?.tema);
    setCatatan(Kajian?.data?.catatan);
    setPosterKajian(Kajian?.data?.poster_kajian || null);
    setKategoriId(Kajian?.data?.KategoriKajianId);
    setUstadzId(Kajian?.data?.UstadzId);
    setHari(Kajian?.data?.Jadwal?.hari);
  }, [Kajian, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllKajianRutin());
    setWaktu("");
    setTema("");
    setCatatan("");
    setPosterKajian(null);
    setKategoriId("");
    setUstadzId("");
    setHari("");
  };

  const actionKajian = (id) => {
    let dataKajian = {
      tipe: tipe,
      waktu_kajian_rutin: waktu,
      tema: tema,
      catatan: catatan,
      poster_kajian: posterKajian,
      KategoriKajianId: kategoriId,
      UstadzId: ustadzId,
      hari: hari,
    };

    if (posterKajian === null) {
      alert("Poster kajian harus jpg,jpeg,png.");
      return;
    }

    dispatch(id ? updateKajian(id, dataKajian) : createKajian(dataKajian))
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllKajianRutin());
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
    await dispatch(getAllKajianRutin(value));
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
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
        setPosterKajian(uploaded);
      }
    } else {
      alert("Anda harus menginput file jpg/jpeg/png");
    }
  };

  const handleClearFile = () => {
    setShowNamaPoster(null);
    setPosterKajian(null);
  };

  const ColumnsKategoriKajian = [
    {
      width: 200,
      align: "center",
      title: "Poster Kajian",
      render: (data) => {
        if (data.poster_kajian) {
          return (
            <div className="flex justify-center items-center">
              <img
                alt={`foto ${data.tema}`}
                src={`${config.api_host_dev}/${formatPathGambar(
                  data.poster_kajian
                )}`}
                className=" w-16 h-16 rounded-lg object-cover border-2 border-gray-100 shadow-md"
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
      width: 200,
      title: "Tema",
      align: "center",
      render: (data) => {
        return data.tema;
      },
    },
    {
      width: 200,
      align: "center",
      title: "Pemateri",
      render: (data) => {
        return data.Ustadz?.nama;
      },
    },
    {
      width: 200,
      align: "center",
      title: "Hari",
      render: (data) => {
        return data.Jadwal?.hari;
      },
    },
    {
      width: 200,
      title: "Jam",
      align: "center",
      render: (data) => {
        return data.waktu_kajian_rutin;
      },
    },
    {
      width: 200,
      align: "center",
      title: "Kategori",
      render: (data) => {
        return data.KategoriKajian?.nama;
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
      title: "Action",
      fixed: "right",
      align: "center",
      width: 75,
      render: (data) => {
        const handleMenuClick = (e, id) => {
          if (e.key === "edit") {
            dispatch(setTabsValue("UpdateKajian"));
            dispatch(getOneKajian(id));
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
                dispatch(deleteKajian(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllKajianRutin());
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
      {TabsValues === "TambahKajian" || TabsValues === "UpdateKajian" ? (
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
              {TabsValues === "TambahKajian"
                ? "Tambah Kajian"
                : TabsValues === "UpdateKajian"
                ? "Edit Kajian"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5 flex flex-col gap-1">
              <label htmlFor="uploadPoster">Upload Poster</label>
              <div className=" gap-2">
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => target.current.click()}
                  id="uploadPoster"
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
                  name="poster_kajian"
                  onChange={handleFileChange}
                  className="hidden"
                  id="posterKajian"
                />
              </div>
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="namaKajian">Tema Kajian</label>
              <Input
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="temaKajian"
                placeholder="Masukkan Tema Kajian"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="tipe">Tipe</label>
              <Input
                autoComplete="off"
                value="RUTIN"
                className="mt-[5px]  w-full"
                id="tipe"
                placeholder="RUTIN"
                disabled
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="waktu">Waktu Kajian</label>
              <Input
                autoComplete="off"
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                className="mt-[5px]  w-full"
                id="waktu"
                placeholder="Contoh: 17.00 - 18.00"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="jadwalKelasDewasa">Hari</label>
              {Hari && Hari?.length > 0 ? (
                <Select
                  id="jadwalKelasDewasa"
                  className="mt-[5px]"
                  value={hari ? hari : null}
                  placeholder="Pilih Hari Kajian"
                  onChange={(value) => setHari(value)}
                >
                  {Hari?.map((hari) => (
                    <Option
                      key={hari?.id}
                      value={hari?.nama}
                    >
                      {hari?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Jadwal Tahsin Belum Ada</div>
              )}
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="ustadz">Pilih Ustadz</label>
              {Ustadzs && Ustadzs?.data?.length > 0 ? (
                <Select
                  id="ustadz"
                  className="mt-[5px]"
                  value={ustadzId ? ustadzId : null}
                  placeholder="Pilih Ustadz"
                  onChange={(value) => setUstadzId(value)}
                >
                  {Ustadzs?.data.map((ustadz) => (
                    <Option
                      key={ustadz?.id}
                      value={ustadz?.id}
                    >
                      {ustadz?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>kajian Tahsin Belum Ada</div>
              )}
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="kategori">Pilih kategori</label>
              {KategoriKajians && KategoriKajians?.data?.length > 0 ? (
                <Select
                  id="kategori"
                  className="mt-[5px]"
                  value={kategoriId ? kategoriId : null}
                  placeholder="Pilih Kategori"
                  onChange={(value) => setKategoriId(value)}
                >
                  {KategoriKajians?.data.map((kategori) => (
                    <Option
                      key={kategori?.id}
                      value={kategori?.id}
                    >
                      {kategori?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>kajian Tahsin Belum Ada</div>
              )}
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="catatan">Catatan</label>
              <Input.TextArea
                rows={4}
                autoComplete="off"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="mt-[5px]  w-full"
                id="catatan"
                placeholder="Masukkan Catatan"
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
                TabsValues === "TambahKajian"
                  ? () => actionKajian()
                  : TabsValues === "UpdateKajian"
                  ? () => actionKajian(Kajian.data.id)
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

            <Tooltip
              placement="top"
              title={"Tambahkan Kajian Baru"}
            >
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahKajian");
                  fetchData();
                }}
              >
                Kategori
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumnsKategoriKajian}
              size="small"
              dataSource={KajianRutins.data}
              pagination={false}
              scroll={{
                y: 440,
              }}
              rowKey={KajianRutins.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabKajianRutin;
