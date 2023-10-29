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
  createUstadz,
  deleteUstadz,
  getAllUstadz,
  getOneUstadz,
  updateStatusUstadz,
  updateUstadz,
} from "../../store/action/ustadz";

const TabUstadz = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Ustadzs, Ustadz } = useSelector((state) => state.UstadzReducer);

  let [namaUstadz, setNamaUstadz] = useState("");
  let [nomorUstadz, setNomorUstadz] = useState("");
  let [alamatUstadz, setAlamatUstadz] = useState("");
  let [pekerjaanUstadz, setPekerjaanUstadz] = useState("");
  let [umurUstadz, setUmurUstadz] = useState(0);

  useEffect(() => {
    dispatch(getAllUstadz());
  }, []);

  useEffect(() => {
    setNamaUstadz(Ustadz?.data?.nama);
    setNomorUstadz(Ustadz?.data?.telepon);
    setAlamatUstadz(Ustadz?.data?.alamat);
    setPekerjaanUstadz(Ustadz?.data?.pekerjaan);
    setUmurUstadz(Ustadz?.data?.umur);
  }, [Ustadz, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllUstadz());
    setNamaUstadz("");
    setNomorUstadz("");
    setAlamatUstadz("");
    setPekerjaanUstadz("");
    setUmurUstadz(0);
  };

  const actionRekening = (id) => {
    let dataUstadz = {
      nama: namaUstadz,
      telepon: nomorUstadz,
      alamat: alamatUstadz,
      pekerjaan: pekerjaanUstadz,
      umur: umurUstadz,
    };

    dispatch(id ? updateUstadz(id, dataUstadz) : createUstadz(dataUstadz))
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllUstadz());
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
    await dispatch(getAllUstadz(value));
  };

  const handleChangeTabs = (value) => {
    dispatch(setTabsValue(value));
  };

  const ColumnsUstadz = [
    {
      width: 200,
      title: "Nama Ustadz",
      render: (data) => {
        return data.nama;
      },
    },
    {
      width: 200,
      title: "Nomor Hp",
      render: (data) => {
        return data.telepon;
      },
    },
    {
      width: 200,
      title: "Alamat",
      render: (data) => {
        return data.alamat;
      },
    },
    {
      width: 200,
      title: "Pekerjaan",
      render: (data) => {
        return data.pekerjaan;
      },
    },
    {
      width: 200,
      title: "Umur",
      render: (data) => {
        return data.umur;
      },
    },
    {
      width: 200,
      title: "Status Aktif",
      render: (data) => {
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusUstadz(data.id, newStatus)).then((response) => {
            if (response.statusCode === 200) {
              message.success(`Status ${newStatus ? "Aktif" : "Tidak Aktif"}`);
              dispatch(getAllUstadz());
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
            dispatch(setTabsValue("UpdateUstadz"));
            dispatch(getOneUstadz(id));
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
                dispatch(deleteUstadz(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllUstadz());
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
      {TabsValues === "TambahUstadz" || TabsValues === "UpdateUstadz" ? (
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
              {TabsValues === "TambahUstadz"
                ? "Tambah Ustadz"
                : TabsValues === "UpdateUstadz"
                ? "Edit Ustadz"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaPengajar">Nama</label>
              <Input
                value={namaUstadz}
                onChange={(e) => setNamaUstadz(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="namaUstadz"
                placeholder="Masukkan Nama Ustadz"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Nomor Handphone</label>
              <Input
                autoComplete="off"
                value={nomorUstadz}
                onChange={(e) => setNomorUstadz(e.target.value)}
                className="mt-[5px]  w-full"
                id="nomorUstadz"
                placeholder="Masukkan Nomor Ustadz"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Alamat</label>
              <Input
                autoComplete="off"
                value={alamatUstadz}
                onChange={(e) => setAlamatUstadz(e.target.value)}
                className="mt-[5px]  w-full"
                id="alamatUstadz"
                placeholder="Masukkan Alamat Ustadz"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Pekerjaan</label>
              <Input
                autoComplete="off"
                value={pekerjaanUstadz}
                onChange={(e) => setPekerjaanUstadz(e.target.value)}
                className="mt-[5px]  w-full"
                id="pekerjaanUstadz"
                placeholder="Masukkan Pekerjaan Ustadz"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="umurPengajar">Umur</label>
              <InputNumber
                value={umurUstadz}
                onChange={(value) => setUmurUstadz(value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="umurUstadz"
                placeholder="Masukkan Umur Ustadz"
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
                TabsValues === "TambahUstadz"
                  ? () => actionRekening()
                  : TabsValues === "UpdateUstadz"
                  ? () => actionRekening(Ustadz.data.id)
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
              title={"Tambahkan Ustadz Baru"}
            >
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahUstadz");
                  fetchData();
                }}
              >
                Ustadz
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumnsUstadz}
              size="small"
              dataSource={Ustadzs.data}
              pagination={false}
              scroll={{
                y: 440,
              }}
              rowKey={Ustadzs.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabUstadz;
