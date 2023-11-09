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

import { formatWaktuArtikel } from "../utils/date";

import ModalsColumn from "../modals/ModalsColumn";

import {
  getAllKajianRutin,
  createLinkKajian,
  deleteLinkKajian,
  getAllLinkKajian,
  getAllLinkKajianByKajianId,
  getOneLinkKajian,
  updateLinkKajian,
} from "../../store/action/kajian";

const TabLinkKajianRutin = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);

  const { LinkKajians, LinkKajian, KajianRutins, Kajian } = useSelector(
    (state) => state.KajianReducer
  );

  let [subTemaLink, setSubTemaLink] = useState("");
  let [waktuLink, setWaktuLink] = useState("");
  let [linkKajian, setLinkKajian] = useState("");
  let [kajianId, setKajianId] = useState("");

  useEffect(() => {
    dispatch(getAllLinkKajian());
    dispatch(getAllKajianRutin());
  }, []);

  useEffect(() => {
    setSubTemaLink(LinkKajian?.data?.sub_tema);
    setWaktuLink(LinkKajian?.data?.waktu);
    setLinkKajian(LinkKajian?.data?.link_kajian);
    setKajianId(LinkKajian?.data?.KajianId);
  }, [LinkKajian, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllLinkKajian());
    setSubTemaLink("");
    setWaktuLink("");
    setLinkKajian("");
    setKajianId("");
  };

  const action = (id) => {
    let dataLinkKajian = {
      sub_tema: subTemaLink,
      waktu: waktuLink,
      link_kajian: linkKajian,
      KajianId: kajianId,
    };

    dispatch(
      id
        ? updateLinkKajian(id, dataLinkKajian)
        : createLinkKajian(dataLinkKajian)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllLinkKajian());
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
    await dispatch(getAllLinkKajian(value));
  };

  const ColumsLinkKajian = [
    {
      title: "Sub Tema",
      align: "center",
      width: 250,
      render: (data) => {
        return data.sub_tema;
      },
    },
    {
      title: "Waktu",
      align: "center",
      width: 250,
      render: (data) => {
        return formatWaktuArtikel(data.waktu);
      },
    },
    {
      title: "Link Kajian",
      align: "center",
      width: 300,
      render: (data) => {
        return data?.link_kajian;
      },
    },
    {
      width: 200,
      title: "Kajian",
      align: "center",
      render: (data) => {
        return data?.Kajian?.tema;
      },
    },
    {
      width: 200,
      title: "Ustadz",
      align: "center",
      render: (data) => {
        return data?.Kajian?.Ustadz?.nama;
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
            dispatch(setTabsValue("updateLinkKajian"));
            dispatch(getOneLinkKajian(id));
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
                dispatch(deleteLinkKajian(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllLinkKajian());
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
    setWaktuLink(value);
  };
  const onOk = (value) => {
    setWaktuLink(value);
  };

  return (
    <div>
      {TabsValues === "TambahLinkKajian" ||
      TabsValues === "updateLinkKajian" ? (
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
              {TabsValues === "TambahLinkKajian"
                ? "Tambah Link Kajian"
                : TabsValues === "updateLinkKajian"
                ? "Edit Link Kajian"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between overflow-auto max-h-[480px]">
            <div className="w-[45%] mb-5">
              <label htmlFor="subTemaLink">Sub Tema</label>
              <Input
                value={subTemaLink}
                onChange={(e) => setSubTemaLink(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="subTemaLink"
                placeholder="Masukkan Sub Tema Link Kajian"
              />
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="waktuLinkKajian">Waktu</label>

              <Space direction="vertical" size={10}>
                <DatePicker
                  className="w-full mt-2"
                  value={waktuLink ? dayjs(waktuLink) : null}
                  showTime
                  id="waktuLinkKajian"
                  onChange={onChange}
                  placeholder="Pilih Waktu"
                  onOk={onOk}
                />
              </Space>
            </div>

            <div className="w-[45%] mb-5">
              <label htmlFor="linkKajianLink">Link Kajian</label>
              <Input
                autoComplete="off"
                value={linkKajian}
                onChange={(e) => setLinkKajian(e.target.value)}
                className="mt-[5px]  w-full"
                id="linkKajianLink"
                placeholder="Masukkan LinkKajian"
              />
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="divisiLinkKajian">Kajian Rutin</label>
              {KajianRutins && KajianRutins?.data?.length > 0 ? (
                <Select
                  id="divisiLinkKajian"
                  className="mt-[5px]"
                  value={kajianId ? kajianId : null}
                  placeholder="Pilih Divisi"
                  onChange={(value) => setKajianId(value)}
                >
                  {KajianRutins?.data.map((kajian) => (
                    <Option key={kajian?.id} value={kajian?.id}>
                      {kajian?.tema}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div>Kajian Rutin Belum Ada</div>
              )}
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
                  TabsValues === "TambahLinkKajian"
                    ? () => action()
                    : TabsValues === "updateLinkKajian"
                    ? () => action(LinkKajian.data.id)
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
            <Tooltip placement="top" title={"Tambahkan Kegaitan"}>
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahLinkKajian");
                  fetchData();
                }}
              >
                Link Kajian
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsLinkKajian}
              size="small"
              dataSource={LinkKajians.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 1400,
              }}
              rowKey={LinkKajians.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabLinkKajianRutin;
