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
} from "antd";

import {
  PlusOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
const { Search } = Input;

import { setTabsValue } from "../../store/action/tabs";
import Swal from "sweetalert2";

import {
  createKategoriKajian,
  deleteKategoriKajian,
  getAllKategoriKajian,
  getOneKategoriKajian,
  updateKategoriKajian,
} from "../../store/action/kajian";

const TabKategoriKajian = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { KategoriKajians, KategoriKajian } = useSelector(
    (state) => state.KajianReducer
  );

  let [namaKategori, setNamaKategori] = useState("");
  let [catatan, setCatatan] = useState("");

  useEffect(() => {
    dispatch(getAllKategoriKajian());
  }, []);

  useEffect(() => {
    setNamaKategori(KategoriKajian?.data?.nama);
    setCatatan(KategoriKajian?.data?.catatan);
  }, [KategoriKajian, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllKategoriKajian());
    setNamaKategori("");
    setCatatan("");
  };

  const actionRekening = (id) => {
    let dataKategoriKajian = {
      nama: namaKategori,
      catatan: catatan,
    };

    dispatch(
      id
        ? updateKategoriKajian(id, dataKategoriKajian)
        : createKategoriKajian(dataKategoriKajian)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllKategoriKajian());
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
    await dispatch(getAllKategoriKajian(value));
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  const ColumnsKategoriKajian = [
    {
      width: 200,
      title: "Nama Kategori",
      align: "center",
      width: 50,
      render: (data) => {
        return data.nama;
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
      width: 20,
      render: (data) => {
        const handleMenuClick = (e, id) => {
          if (e.key === "edit") {
            dispatch(setTabsValue("UpdateKategoriKajian"));
            dispatch(getOneKategoriKajian(id));
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
                dispatch(deleteKategoriKajian(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllKategoriKajian());
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
      {TabsValues === "TambahKategoriKajian" ||
      TabsValues === "UpdateKategoriKajian" ? (
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
              {TabsValues === "TambahKategoriKajian"
                ? "Tambah Kategori Kajian"
                : TabsValues === "UpdateKategoriKajian"
                ? "Edit Kategori Kajian"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaKategoriKajian">Nama Kategori</label>
              <Input
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="namaKategoriKajian"
                placeholder="Masukkan Kategori"
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
                TabsValues === "TambahKategoriKajian"
                  ? () => actionRekening()
                  : TabsValues === "UpdateKategoriKajian"
                  ? () => actionRekening(KategoriKajian.data.id)
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
              placeholder="Masukkan Kategori Kajian"
              onSearch={handleSearch}
              style={{
                width: 400,
              }}
            />

            <Tooltip placement="top" title={"Tambahkan Kategori Baru"}>
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahKategoriKajian");
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
              dataSource={KategoriKajians.data}
              pagination={false}
              scroll={{
                y: 440,
              }}
              rowKey={KategoriKajians.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabKategoriKajian;
