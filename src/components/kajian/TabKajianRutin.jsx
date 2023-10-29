import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  Tag,
  Input,
  Button,
  Tooltip,
  InputNumber,
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
} from "@ant-design/icons";

import { setTabsValue } from "../../store/action/tabs";
import Swal from "sweetalert2";

import {
  createKajian,
  createKategoriKajian,
  deleteKajian,
  deleteKategoriKajian,
  getAllKajianRutin,
  getAllKategoriKajian,
  getOneKajian,
  getOneKategoriKajian,
  updateKajian,
} from "../../store/action/kajian";
import { config } from "../../configs";
import formatPathGambar from "../utils/formatGambar";

const { Search } = Input;
const { Option } = Select;

const TabKajianRutin = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { KajianRutins, Kajian, KategoriKajians } = useSelector(
    (state) => state.KajianReducer
  );
  const { Ustadzs } = useSelector((state) => state.UstadzReducer);

  let [tipe, setTipe] = useState("");
  let [penerjemah, setPenerjemah] = useState("");
  let [waktu, setWaktu] = useState("");
  let [tema, setTema] = useState("");
  let [catatan, setCatatan] = useState("");
  let [posterKajian, setPosterKajian] = useState("");
  let [kategoriId, setKategoriId] = useState("");
  let [ustadzId, setUstadzId] = useState("");
  let [hari, setHari] = useState("");

  useEffect(() => {
    dispatch(getAllKajianRutin());
  }, []);

  useEffect(() => {
    setTipe(Kajian?.data?.tipe);
    setPenerjemah(Kajian?.data?.namma_penerjemah);
    setWaktu(Kajian?.data?.waktu_kajian_rutin);
    setTema(Kajian?.data?.tema);
    setCatatan(Kajian?.data?.catatan);
    setPosterKajian(Kajian?.data?.poster_kajian);
    setKategoriId(Kajian?.data?.KategoriKajianId);
    setUstadzId(Kajian?.data?.UstadzId);
    setHari(Kajian?.data?.Jadwal.hari);
  }, [Kajian, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllKajianRutin());
    setTipe("");
    setPenerjemah("");
    setWaktu("");
    setTema("");
    setCatatan("");
    setPosterKajian("");
    setKategoriId("");
    setUstadzId("");
    setHari("");
  };

  const actionKajian = (id) => {
    let dataKajian = {
      tipe: tipe,
      nama_penerjemah: penerjemah,
      waktu_kajian_rutin: waktu,
      tema: tema,
      catatan: catatan,
      poster_kajian: posterKajian,
      KategoriKajianId: kategoriId,
      UstadzId: ustadzId,
      hari: hari,
    };

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

  const ColumnsKategoriKajian = [
    {
      width: 200,
      title: "Poster Kajian",
      render: (data) => {
        if (data.poster_kajian) {
          return (
            <img
              alt={`foto ${data.tema}`}
              src={`${config.api_host_dev}/${formatPathGambar(
                data.poster_kajian
              )}`}
              className="w-16 h-16 rounded-lg border-2 border-gray-100 shadow-md"
            />
          );
        } else {
          return (
            <div
              alt={`foto ${data.tema}`}
              className="w-16 h-16 rounded-lg border-2 bg-slate-50 border-gray-100
              shadow-md flex justify-center items-center"
            >
              <p className="text-center text-xs font-medium text-slate-400">
                Empty
              </p>
            </div>
          );
        }
      },
    },
    {
      width: 200,
      title: "Tema",
      render: (data) => {
        return data.tema;
      },
    },
    {
      width: 200,
      title: "Pemateri",
      render: (data) => {
        return data.Ustadz?.nama;
      },
    },
    {
      width: 200,
      title: "Hari",
      render: (data) => {
        return data.Jadwal.hari;
      },
    },
    {
      width: 200,
      title: "Jam",
      render: (data) => {
        return data.waktu_kajian_rutin;
      },
    },
    {
      width: 200,
      title: "Penerjemah",
      render: (data) => {
        return data.nama_penerjemah;
      },
    },
    {
      width: 200,
      title: "Catatan",
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
            <div className="w-[45%] mb-5">
              <label htmlFor="namaKajian">Nama Kajian</label>
              <Input
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="namaKajian"
                placeholder="Masukkan Nama Kajian"
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
            <div className="w-[45%] mb-5">
              <label htmlFor="waktu">Tipe</label>
              <Input
                autoComplete="off"
                value="RUTIN"
                onChange={(e) => setTipe(e.target.value)}
                className="mt-[5px]  w-full"
                id="waktu"
                placeholder="Contoh: 17.00 - 18.00"
                disabled
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="penerjemah">Nama Penerjemah</label>
              <Input
                autoComplete="off"
                value={penerjemah}
                onChange={(e) => setPenerjemah(e.target.value)}
                className="mt-[5px]  w-full"
                id="penerjemah"
                placeholder="Masukkan nama penerjemah"
              />
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
                  value={ustadzId ? ustadzId : null}
                  placeholder="Pilih Kategori"
                  onChange={(value) => setKategoriId(value)}
                >
                  {KategoriKajians?.data.map((kajian) => (
                    <Option
                      key={kajian?.id}
                      value={kajian?.id}
                    >
                      {kajian?.UstadzId}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>kajian Tahsin Belum Ada</div>
              )}
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="catatan">Catatan</label>
              <Input
                autoComplete="off"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="mt-[5px]  w-full"
                id="catatan"
                placeholder="Masukkan Catatan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="catatan">Catatan</label>
              <Input
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
