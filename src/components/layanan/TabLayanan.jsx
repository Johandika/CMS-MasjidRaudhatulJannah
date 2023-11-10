import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setTabsValue } from "../../store/action/tabs";
import ImgCrop from "antd-img-crop";

import moment from "moment";
import dayjs from "dayjs";

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
  Upload,
  DatePicker,
  Modal,
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
  createLayanan,
  deleteLayanan,
  getAllLayanan,
  getOneLayanan,
  updateLayanan,
  updateStatusLayanan,
} from "../../store/action/layanan";

import { getAllDivisi, getOneDivisi } from "../../store/action/divisi";

import { formatWaktuArtikel } from "../utils/date";

import ModalsColumn from "../modals/ModalsColumn";
import UploadFile from "../modals/upload";

const TabLayanan = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Divisis, Divisi } = useSelector((state) => state.DivisiReducer);
  const { Layanans, Layanan } = useSelector((state) => state.LayananReducer);

  let [titleLayanan, setTitleLayanan] = useState("");
  let [subTitleLayanan, setSubTitleLayanan] = useState("");
  let [waktuLayanan, setWaktuLayanan] = useState("");
  let [lokasiLayanan, setLokasiLayanan] = useState("");
  let [informasiLayanan, setInformasiLayanan] = useState("");
  let [deskripsiLayanan, setDeskripsiLayanan] = useState("");
  let [divisiId, setDivisiId] = useState("");
  let [gambarLayanan, setGambarLayanan] = useState([]);
  let [deskripsiGambarLayanan, setDeskripsiGambarLayanan] = useState("");

  useEffect(() => {
    dispatch(getAllLayanan());
    dispatch(getAllDivisi());
  }, []);

  useEffect(() => {
    setTitleLayanan(Layanan?.data?.title);
    setSubTitleLayanan(Layanan?.data?.sub_title);
    setWaktuLayanan(Layanan?.data?.waktu);
    setLokasiLayanan(Layanan?.data?.lokasi);
    setInformasiLayanan(Layanan?.data?.informasi);
    setDeskripsiLayanan(Layanan?.data?.deskripsi);
    setDivisiId(Layanan?.data?.DivisiId);
    setGambarLayanan(Layanan?.data?.gambar_layanan);
    setDeskripsiGambarLayanan(Layanan?.data?.deskripsi_gambar);
  }, [Layanan, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllLayanan());
    setTitleLayanan("");
    setSubTitleLayanan("");
    setWaktuLayanan("");
    setLokasiLayanan("");
    setInformasiLayanan("");
    setDeskripsiLayanan("");
    setGambarLayanan([]);
    setDivisiId("");
    setDeskripsiGambarLayanan("");
  };

  const action = (id) => {
    let dataLayanan = {
      title: titleLayanan,
      sub_title: subTitleLayanan,
      waktu: waktuLayanan,
      lokasi: lokasiLayanan,
      informasi: informasiLayanan,
      deskripsi: deskripsiLayanan,
      DivisiId: divisiId,
      deskripsi_gambar: deskripsiGambarLayanan,
      gambar_layanan: gambarLayanan[0].originFileObj,
    };

    dispatch(id ? updateLayanan(id, dataLayanan) : createLayanan(dataLayanan))
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllLayanan());
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
    await dispatch(getAllLayanan(value));
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const showModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setIsModalVisible(true);
  };

  const ColumsLayanan = [
    {
      title: "Title",
      align: "center",
      width: 250,
      render: (data) => {
        return data.title;
      },
    },
    {
      title: "Sub Title",
      align: "center",
      width: 250,
      render: (data) => {
        return data.sub_title;
      },
    },
    {
      title: "Divisi",
      align: "center",
      width: 250,
      render: (data) => {
        return data.Divisi ? data.Divisi.nama : "Tidak Ada Divisi Khusus";
      },
    },
    {
      title: "Waktu Layanan",
      align: "center",
      width: 300,
      render: (data) => {
        return data.waktu
          ? formatWaktuArtikel(data.waktu)
          : "Tidak Ada Waktu Tertentu";
      },
    },

    ModalsColumn("Lokasi Layanan", "lokasi", showModal),
    ModalsColumn("Informasi Layanan", "informasi", showModal),
    ModalsColumn("Deskripsi Layanan", "deskripsi", showModal),
    ModalsColumn("Deskripsi Gambar", "deskripsi_gambar", showModal),
    {
      width: 150,
      title: "Status Aktif",
      align: "center",
      render: (data) => {
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusLayanan(data.id, newStatus)).then((response) => {
            if (response.statusCode === 200) {
              message.success(`Status ${newStatus ? "Aktif" : "Tidak Aktif"}`);
              dispatch(getAllLayanan());
            } else {
              message.error(response.message);
            }
          });
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
        const handleMenuClick = (e, id) => {
          if (e.key === "edit") {
            dispatch(setTabsValue("updateLayanan"));
            dispatch(getOneLayanan(id));
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
                dispatch(deleteLayanan(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllLayanan());
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

  const onChange = (value, dateString) => {
    setWaktuLayanan(value);
  };
  const onOk = (value) => {
    setWaktuLayanan(value);
  };

  return (
    <div>
      {TabsValues === "TambahLayanan" || TabsValues === "updateLayanan" ? (
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
              {TabsValues === "TambahLayanan"
                ? "Tambah Layanan"
                : TabsValues === "updateLayanan"
                ? "Edit Layanan"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between overflow-auto max-h-[470px] pb-5">
            <div className="w-[45%] mb-5">
              <label htmlFor="titleLayanan">Title</label>
              <Input
                value={titleLayanan}
                onChange={(e) => setTitleLayanan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="titleLayanan"
                placeholder="Masukkan Title Layanan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="subtitleLayanan">Sub Title</label>
              <Input
                value={subTitleLayanan}
                onChange={(e) => setSubTitleLayanan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="subtitleLayanan"
                placeholder="Masukkan Sub Title Layanan"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="divisiLayanan">Divisi Layanan</label>
              {Divisis && Divisis?.data?.length > 0 ? (
                <Select
                  id="divisiLayanan"
                  className="mt-[5px]"
                  value={divisiId ? divisiId : null}
                  placeholder="Pilih Divisi"
                  onChange={(value) => setDivisiId(value)}
                >
                  {Divisis?.data.map((div) => (
                    <Option key={div?.id} value={div?.id}>
                      {div?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Divisi Belum Ada</div>
              )}
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="waktuLayanan">Waktu</label>

              <Space direction="vertical" size={10}>
                <DatePicker
                  className="w-full mt-2"
                  value={waktuLayanan ? dayjs(waktuLayanan) : null}
                  showTime
                  id="waktuLayanan"
                  onChange={onChange}
                  placeholder="Pilih Waktu"
                  onOk={onOk}
                />
              </Space>
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="deskripsiGambar">Gambar</label>
              <UploadFile
                setValue={setGambarLayanan}
                title={"Gambar"}
                value={gambarLayanan}
                single={true}
                key={"wd"}
              />
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="lokasiLayanan">Lokasi</label>
              <Input.TextArea
                value={lokasiLayanan}
                onChange={(e) => setLokasiLayanan(e.target.value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="lokasiLayanan"
                rows={3}
                placeholder="Masukkan Lokasi Layanan"
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="informasiLayanan">Informasi</label>
              <Input.TextArea
                value={informasiLayanan}
                onChange={(e) => setInformasiLayanan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={3}
                id="informasiLayanan"
                placeholder="Masukkan Informasi Layanan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="deskripsiLayanan">Deskripsi</label>
              <Input.TextArea
                value={deskripsiLayanan}
                onChange={(e) => setDeskripsiLayanan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={3}
                id="deskripsiLayanan"
                placeholder="Masukkan Deskripsi Layanan"
              />
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="deskripsiGambar">Deskripsi Gambar</label>
              <Input.TextArea
                value={deskripsiGambarLayanan}
                onChange={(e) => setDeskripsiGambarLayanan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={3}
                id="deskripsiGambar"
                placeholder="Masukkan Deskripsi Gambar Layanan"
              />
            </div>

            <div className="flex gap-3 justify-end w-full mt-4">
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
                  TabsValues === "TambahLayanan"
                    ? () => action()
                    : TabsValues === "updateLayanan"
                    ? () => action(Layanan.data.id)
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
              placeholder="Masukkan Title Layanan"
              onSearch={handleSearch}
              style={{
                width: 400,
              }}
            />
            <Tooltip placement="top" title={"Tambahkan Kegaitan"}>
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahLayanan");
                  fetchData();
                }}
              >
                Layanan
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsLayanan}
              size="small"
              dataSource={Layanans.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 3000,
              }}
              rowKey={Layanans.id}
            />
          </div>
          <div>
            <Modal
              title={modalTitle}
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {modalContent}
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabLayanan;
