import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { message, Table, Input, Button, Tooltip, InputNumber } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
const { Search } = Input;

import {
  createRekening,
  getAllRekening,
  updateRekening,
} from "../../store/action/rekening";
import ubahFormatDate from "../../components/utils/date";
import { setTabsValue } from "../../store/action/tabs";

const TabRekening = () => {
  const dispatch = useDispatch();

  const { TabsValues } = useSelector((state) => state.TabsReducer);
  const { Rekenings, Rekening } = useSelector((state) => state.RekeningReducer);

  let [namaRekening, setNamaRekening] = useState("");
  let [nomorRekening, setNomorRekening] = useState("");
  let [saldo, setSaldo] = useState(0);
  let [catatan, setCatatan] = useState("");
  let [namaBank, setNamaBank] = useState("");

  useEffect(() => {
    dispatch(getAllRekening());
  }, []);

  const fetchData = async () => {
    await dispatch(getAllRekening());
    setNamaRekening("");
    setNomorRekening("");
    setSaldo(0);
    setCatatan("");
    setNamaBank("");
  };

  const handleSearch = async (value) => {
    await dispatch(getAllRekening(value));
  };

  const actionRekening = (id) => {
    let dataRekening = {
      atas_nama: namaRekening,
      nomor_rekening: nomorRekening,
      saldo: saldo,
      catatan: catatan,
      nama_bank: namaBank,
    };

    dispatch(
      id ? updateRekening(id, dataRekening) : createRekening(dataRekening)
    )
      .then((data) =>
        message.loading("Loading", 1, () => {
          if (data.statusCode == 201 || data.statusCode == 200) {
            message.success(data.message, 1, () => {
              dispatch(getAllRekening());
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

  const ColumsPengajar = [
    {
      title: "Nama",
      render: (data) => {
        return data.atas_nama;
      },
    },
    {
      width: 200,
      title: "Nomor Rekening",
      render: (data) => {
        return data.nomor_rekening;
      },
    },
    {
      width: 200,
      title: "Saldo",
      render: (data) => {
        return `Rp.${data.saldo}`;
      },
    },
    {
      width: 250,
      title: "Terakhir Update",
      render: (data) => {
        return ubahFormatDate(data.updatedAt);
      },
    },
    {
      width: 200,
      title: "action",
      render: (data) => {
        return ubahFormatDate(data.updatedAt);
      },
    },
  ];

  return (
    <div>
      {TabsValues === "TambahRekening" || TabsValues === "updatePengajar" ? (
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
              {TabsValues === "TambahRekening"
                ? "Tambah Pengajar"
                : TabsValues === "updatePengajar"
                ? "Edit Pengajar"
                : ""}
            </p>
          </div>

          {/* Inputan */}
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-[45%] mb-5">
              <label htmlFor="namaPengajar">Nama Rekening</label>
              <Input
                value={namaRekening}
                onChange={(e) => setNamaRekening(e.target.value)}
                className="mt-[5px]"
                autoComplete="off"
                id="namaRekening"
                placeholder="Masukkan Nama Rekening"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Nomor Rekening</label>
              <Input
                autoComplete="off"
                value={nomorRekening}
                onChange={(e) => setNomorRekening(e.target.value)}
                className="mt-[5px]  w-full"
                id="nomorRekening"
                placeholder="Masukkan Nomor Rekening"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Nama Bank</label>
              <Input
                autoComplete="off"
                value={namaBank}
                onChange={(e) => setNamaBank(e.target.value)}
                className="mt-[5px]  w-full"
                id="nomorRekening"
                placeholder="Masukkan Nama Bank"
              />
            </div>
            <div className="w-[45%] mb-5">
              <label htmlFor="teleponPengajar">Catatan</label>
              <Input
                autoComplete="off"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="mt-[5px]  w-full"
                id="nomorRekening"
                placeholder="Masukkan Catatan"
              />
            </div>

            <div className="w-[45%] mb-5 flex flex-col">
              <label htmlFor="umurPengajar">Saldo</label>
              <InputNumber
                value={saldo}
                onChange={(value) => setSaldo(value)}
                className="mt-[5px] w-full"
                autoComplete="off"
                id="saldoRekening"
                placeholder="Masukkan Saldo Rekening"
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
                TabsValues === "TambahRekening"
                  ? () => actionRekening()
                  : TabsValues === "updatePengajar"
                  ? () => actionRekening(Rekening.data.id)
                  : null
              }
            >
              Simpan
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full p-5">
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
                title={"Tambahkan Rekening Baru"}
              >
                <Button
                  icon={<PlusOutlined />}
                  className="bg-primaryLight text-white"
                  onClick={() => {
                    handleChangeTabs("TambahRekening");
                    fetchData();
                  }}
                >
                  Rekening
                </Button>
              </Tooltip>
            </div>
            <div>
              <Table
                columns={ColumsPengajar}
                dataSource={Rekenings.data}
                pagination={false}
                scroll={{
                  y: 440,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabRekening;
