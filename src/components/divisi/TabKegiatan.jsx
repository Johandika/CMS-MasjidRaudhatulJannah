import { useEffect, useRef, useState } from "react";
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
  createKegiatan,
  deleteKegiatan,
  getAllKegiatan,
  getOneKegiatan,
  updateHeadlineKegiatan,
  updateKegiatan,
  updateStatusKegiatan,
} from "../../store/action/kegiatan";
import { getAllDivisi, getOneDivisi } from "../../store/action/divisi";
import { formatWaktuArtikel } from "../utils/date";
import ModalsColumn from "../modals/ModalsColumn";
import { config } from "../../configs";
import formatPathGambar from "../utils/formatGambar";

const TabKegiatan = () => {
  const dispatch = useDispatch();
  const target = useRef(null);

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Divisis, Divisi } = useSelector((state) => state.DivisiReducer);
  const { Kegiatans, Kegiatan } = useSelector((state) => state.KegiatanReducer);

  let [temaKegiatan, setTemaKegiatan] = useState("");
  let [penanggungJawabKegiatan, setPenagunggJawabKegiatan] = useState("");
  let [waktuKegiatan, setWaktuKegiatan] = useState("");
  let [lokasiKegiatan, setLokasiKegiatan] = useState("");
  let [catatanKegiatan, setCatatanKegiatan] = useState("");
  let [deskripsiKegiatan, setDeskripsiKegiatan] = useState("");
  let [linkKegiatan, setLinkKegiatan] = useState("");
  let [divisiId, setDivisiId] = useState("");
  // let [fileList, setFileList] = useState([]);
  let [deskripsiGambarKegiatan, setDeskripsiGambarKegiatan] = useState("");
  let [showNamaPoster, setShowNamaPoster] = useState(null);
  let [posterKegiatan, setPosterKegiatan] = useState(null);

  useEffect(() => {
    dispatch(getAllKegiatan());
    dispatch(getAllDivisi());
  }, []);

  useEffect(() => {
    setTemaKegiatan(Kegiatan?.data?.tema);
    setPenagunggJawabKegiatan(Kegiatan?.data?.penanggung_jawab);
    setWaktuKegiatan(Kegiatan?.data?.waktu);
    setLokasiKegiatan(Kegiatan?.data?.lokasi);
    setCatatanKegiatan(Kegiatan?.data?.catatan);
    setDeskripsiKegiatan(Kegiatan?.data?.deskripsi);
    setLinkKegiatan(Kegiatan?.data?.link);
    setDivisiId(Kegiatan?.data?.DivisiId);
    // setFileList(Kegiatan?.data?.gambar_kegiatan);
    setPosterKegiatan(Kegiatan?.data?.gambar_kegiatan || null);
    setDeskripsiGambarKegiatan(Kegiatan?.data?.deskripsi_gambar);
  }, [Kegiatan, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllKegiatan());
    setTemaKegiatan("");
    setPenagunggJawabKegiatan("");
    setWaktuKegiatan("");
    setLokasiKegiatan("");
    setCatatanKegiatan("");
    setDeskripsiKegiatan("");
    setLinkKegiatan("");
    setDivisiId("");
    setDeskripsiGambarKegiatan("");
    // setFileList("");
  };

  const action = (id) => {
    let dataKegiatan = {
      tema: temaKegiatan,
      penanggung_jawab: penanggungJawabKegiatan,
      waktu: waktuKegiatan,
      lokasi: lokasiKegiatan,
      catatan: catatanKegiatan,
      deskripsi: deskripsiKegiatan,
      link: linkKegiatan,
      headline: false,
      DivisiId: divisiId,
      gambar_kegiatan: posterKegiatan,
      deskripsi_gambar: deskripsiGambarKegiatan,
      // gambar_kegiatan: fileList,
    };

    dispatch(
      id ? updateKegiatan(id, dataKegiatan) : createKegiatan(dataKegiatan)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllKegiatan());
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
    await dispatch(getAllKegiatan(value));
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
        setPosterKegiatan(uploaded);
      }
    } else {
      alert("Anda harus menginput file jpg/jpeg/png");
    }
  };

  const handleClearFile = () => {
    setShowNamaPoster(null);
    setPosterKegiatan(null);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const showModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setIsModalVisible(true);
  };

  const ColumsKegiatan = [
    {
      width: 200,
      align: "center",
      title: "Poster Kegiatan",
      render: (data) => {
        if (data.gambar_kegiatan) {
          return (
            <div className="flex justify-center items-center">
              <img
                alt={`foto ${data.tema}`}
                src={`${config.api_host_dev}/${formatPathGambar(
                  data.gambar_kegiatan
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
      width: 250,
      render: (data) => {
        return data.tema;
      },
    },
    {
      title: "Penanggung Jawab",
      align: "center",
      width: 200,
      render: (data) => {
        return data.penanggung_jawab;
      },
    },
    {
      title: "Waktu Kegiatan",
      align: "center",
      width: 300,
      render: (data) => {
        return formatWaktuArtikel(data.waktu);
      },
    },
    {
      title: "Lokasi Kegiatan",
      align: "center",
      width: 300,
      render: (data) => {
        return data.lokasi;
      },
    },
    ModalsColumn("Deskripsi Kegiatan", "deskripsi", showModal),
    ModalsColumn("Catatan Kegiatan", "catatan", showModal),
    ModalsColumn("Link Kegiatan", "link", showModal),
    ModalsColumn("Deskripsi Gambar", "deskripsi_gambar", showModal),
    {
      title: "Headline",
      width: 200,
      align: "center",
      render: (data) => {
        const handleHeadline = (headline) => {
          dispatch(updateHeadlineKegiatan(data.id, headline)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(`Status ${headline ? "Aktif" : "Tidak Aktif"}`);
                dispatch(getAllKegiatan());
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
              onClick={() => handleHeadline(true)}
            >
              Aktif
            </Menu.Item>
            <Menu.Item
              key="tidak-aktif"
              onClick={() => handleHeadline(false)}
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
                {data.headline ? (
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
      title: "Status Aktif",
      width: 200,
      align: "center",
      render: (data) => {
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusKegiatan(data.id, newStatus)).then(
            (response) => {
              if (response.statusCode === 200) {
                message.success(
                  `Status ${newStatus ? "Aktif" : "Tidak Aktif"}`
                );
                dispatch(getAllKegiatan());
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
            dispatch(setTabsValue("updateKegiatan"));
            dispatch(getOneKegiatan(id));
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
                dispatch(deleteKegiatan(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllKegiatan());
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

  const onChange = (value, dateString) => {
    setWaktuKegiatan(value);
  };
  const onOk = (value) => {
    setWaktuKegiatan(value);
  };

  const onChangeGambar = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div>
      {TabsValues === "TambahKegiatan" || TabsValues === "updateKegiatan" ? (
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
              {TabsValues === "TambahKegiatan"
                ? "Tambah Kegiatan"
                : TabsValues === "updateKegiatan"
                ? "Edit Kegiatan"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between overflow-auto max-h-[480px]">
            <div className="w-[45%] mb-5 flex flex-col gap-1">
              <label htmlFor="uploadPosterKegiatan">Upload Poster</label>
              <div className=" gap-2">
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => target.current.click()}
                  id="uploadPosterKegiatan"
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
                  name="poster_kegiatan"
                  onChange={handleFileChange}
                  className="hidden"
                  id="posterKegiatan"
                />
              </div>
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="temaKegiatan">Tema</label>
              <Input
                value={temaKegiatan}
                onChange={(e) => setTemaKegiatan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="temaKegiatan"
                placeholder="Masukkan Tema Kegiatan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="tjawabkegiatan">Penanggung Jawab</label>
              <Input
                autoComplete="off"
                value={penanggungJawabKegiatan}
                onChange={(e) => setPenagunggJawabKegiatan(e.target.value)}
                className="mt-[5px]  w-full"
                id="tjawabkegiatan"
                placeholder="Masukkan Penanggung Jawab Kegiatan"
              />
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="lokasiKegiatan">Lokasi</label>
              <Input
                value={lokasiKegiatan}
                onChange={(e) => setLokasiKegiatan(e.target.value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="lokasiKegiatan"
                placeholder="Masukkan Lokasi Kegiatan"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="divisiKegiatan">Divisi Kegiatan</label>
              {Divisis && Divisis?.data?.length > 0 ? (
                <Select
                  id="divisiKegiatan"
                  className="mt-[5px]"
                  value={divisiId ? divisiId : null}
                  placeholder="Pilih Divisi"
                  onChange={(value) => setDivisiId(value)}
                >
                  {Divisis?.data.map((div) => (
                    <Option
                      key={div?.id}
                      value={div?.id}
                    >
                      {div?.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Divisi Belum Ada</div>
              )}
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="waktuKegiatan">Waktu</label>

              <Space
                direction="vertical"
                size={10}
              >
                <DatePicker
                  className="w-full mt-2"
                  value={waktuKegiatan ? dayjs(waktuKegiatan) : null}
                  showTime
                  id="waktuKegiatan"
                  onChange={onChange}
                  placeholder="Pilih Waktu"
                  onOk={onOk}
                />
              </Space>
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="linkKegiatan">Link Kegiatan</label>
              <Input
                value={linkKegiatan}
                onChange={(e) => setLinkKegiatan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="linkKegiatan"
                placeholder="Masukkan Link Kegiatan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="catatanKegiatan">Catatan</label>
              <Input.TextArea
                value={catatanKegiatan}
                onChange={(e) => setCatatanKegiatan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={5}
                id="catatanKegiatan"
                placeholder="Masukkan Catatan Kegiatan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="deskripsiKegiatan">Deskripsi</label>
              <Input.TextArea
                value={deskripsiKegiatan}
                onChange={(e) => setDeskripsiKegiatan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={5}
                id="deskripsiKegiatan"
                placeholder="Masukkan Deskripsi Kegiatan"
              />
            </div>
            {/* <div className="w-[45%] mb-5">
              <label htmlFor="gambarKegiatan">Gambar Kegiatan</label>
              <ImgCrop rotationSlider>
                <Upload
                  id="gambarKegiatan"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChangeGambar}
                  onPreview={onPreview}
                >
                  {fileList.length === 0 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div> */}
            <div className="w-[45%] mb-5">
              <label htmlFor="deskripsiGambar">Deskripsi Gambar</label>
              <Input.TextArea
                value={deskripsiGambarKegiatan}
                onChange={(e) => setDeskripsiGambarKegiatan(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={5}
                id="deskripsiGambar"
                placeholder="Masukkan Deskripsi Gambar Kegiatan"
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
                  TabsValues === "TambahKegiatan"
                    ? () => action()
                    : TabsValues === "updateKegiatan"
                    ? () => action(Kegiatan.data.id)
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
              placeholder="Masukkan Nama/Telepon"
              onSearch={handleSearch}
              style={{
                width: 400,
              }}
            />
            <Tooltip
              placement="top"
              title={"Tambahkan Kegaitan"}
            >
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahKegiatan");
                  fetchData();
                }}
              >
                Kegiatan
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsKegiatan}
              size="small"
              dataSource={Kegiatans.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 2000,
              }}
              rowKey={Kegiatans.id}
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

export default TabKegiatan;
