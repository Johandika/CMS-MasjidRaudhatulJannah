import { useEffect, useState } from "react";
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
  createDivisi,
  deleteDivisi,
  getAllDivisi,
  getOneDivisi,
  updateDivisi,
  updateStatusDivisi,
} from "../../store/action/divisi";
import ModalsColumn from "../modals/ModalsColumn";

const TabDivisi = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Divisis, Divisi } = useSelector((state) => state.DivisiReducer);

  let [namaDivisi, setNamaDivisi] = useState("");
  let [penanggungJawab, setPenanggungJawab] = useState("");
  let [telepon, setTelepon] = useState("");
  let [deskripsi, setDeskripsi] = useState("");
  let [catatan, setCatatan] = useState("");

  useEffect(() => {
    dispatch(getAllDivisi());
  }, []);

  useEffect(() => {
    setNamaDivisi(Divisi?.data?.nama);
    setPenanggungJawab(Divisi?.data?.penanggung_jawab);
    setTelepon(Divisi?.data?.telepon);
    setCatatan(Divisi?.data?.catatan);
    setDeskripsi(Divisi?.data?.deskripsi);
  }, [Divisi, TabsValues]);

  const fetchData = async () => {
    await dispatch(getAllDivisi());
    setNamaDivisi("");
    setPenanggungJawab("");
    setTelepon("");
    setCatatan("");
    setDeskripsi("");
  };

  const actionDivisi = (id) => {
    let dataDivisi = {
      nama: namaDivisi,
      penanggung_jawab: penanggungJawab,
      telepon: telepon,
      deskripsi: deskripsi,
      catatan: catatan,
    };

    dispatch(id ? updateDivisi(id, dataDivisi) : createDivisi(dataDivisi))
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllDivisi());
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
    await dispatch(getAllDivisi(value));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const showModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setIsModalVisible(true);
  };

  const ColumsDivisi = [
    {
      title: "Nama",
      align: "center",
      width: 250,
      render: (data) => {
        return data.nama;
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
      title: "Telepon",
      align: "center",
      width: 250,
      render: (data) => {
        return data.telepon;
      },
    },
    {
      title: "Catatan",
      align: "center",
      render: (data) => {
        return data.catatan;
      },
    },
    ModalsColumn("Deskripsi Divisi", "deskripsi", showModal),
    {
      title: "Status Aktif",
      align: "center",
      render: (data) => {
        const handleStatusChange = (newStatus) => {
          dispatch(updateStatusDivisi(data.id, newStatus)).then((response) => {
            if (response.statusCode === 200) {
              message.success(`Status ${newStatus ? "Aktif" : "Tidak Aktif"}`);
              dispatch(getAllDivisi());
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
            dispatch(setTabsValue("updateDivisi"));
            dispatch(getOneDivisi(id));
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
                dispatch(deleteDivisi(id)).then((data) => {
                  message.loading("Loading", 1, () => {
                    if (data.statusCode == 200) {
                      message.success(data.message);
                      dispatch(getAllDivisi());
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
      {TabsValues === "TambahDivisi" || TabsValues === "updateDivisi" ? (
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
              {TabsValues === "TambahDivisi"
                ? "Tambah Divisi"
                : TabsValues === "updateDivisi"
                ? "Edit Divisi"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaDivisi">Nama</label>
              <Input
                value={namaDivisi}
                onChange={(e) => setNamaDivisi(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="namaDivisi"
                placeholder="Masukkan Nama Divisi"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="penanggungjawabDivisi">Penanggung Jawab</label>
              <Input
                autoComplete="off"
                value={penanggungJawab}
                onChange={(e) => setPenanggungJawab(e.target.value)}
                className="mt-[5px]  w-full"
                id="penanggungjawabDivisi"
                placeholder="Masukkan Penanggung Jawab"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponDivisi">Telepon</label>
              <Input
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="teleponDivisi"
                placeholder="Masukkan Telepon"
              />
            </div>
            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="catatanDivisi">Catatan</label>
              <Input
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="catatanDivisi"
                placeholder="Masukkan Catatan"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="deskripsiDivisi">Deskripsi</label>
              <Input.TextArea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                rows={5}
                id="deskripsiDivisi"
                placeholder="Masukkan Deskripsi"
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
                TabsValues === "TambahDivisi"
                  ? () => actionDivisi()
                  : TabsValues === "updateDivisi"
                  ? () => actionDivisi(Divisi.data.id)
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
              placeholder="Masukkan Nama Divis/Penanggung Jawab"
              onSearch={handleSearch}
              style={{
                width: 400,
              }}
            />
            <Tooltip
              placement="top"
              title={"Tambahkan Divisi"}
            >
              <Button
                icon={<PlusOutlined />}
                className="bg-primaryLight text-white"
                onClick={() => {
                  handleChangeTabs("TambahDivisi");
                  fetchData();
                }}
              >
                Divisi
              </Button>
            </Tooltip>
          </div>
          <div>
            <Table
              columns={ColumsDivisi}
              size="small"
              dataSource={Divisis.data}
              pagination={false}
              scroll={{
                y: 480,
                x: 1400,
              }}
              rowKey={Divisis.id}
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

export default TabDivisi;
