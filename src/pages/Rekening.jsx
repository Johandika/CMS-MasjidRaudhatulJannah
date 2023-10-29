// import { useDispatch } from "react-redux";
import { Tabs } from "antd";
import TabRekening from "../components/rekening/TabRekening";
import TabUangMasuk from "../components/rekening/TabUangMasuk";
import TabUangKeluar from "../components/rekening/TabUangKeluar";

const Rekening = () => {
  return (
    <div className="w-full h-full px-5">
      <Tabs
        className=""
        size="large"
        type="line"
        defaultActiveKey="1"
        items={[
          {
            label: "Rekening",
            key: "1",
            children: <TabRekening />,
          },
          {
            label: "Catatan Uang Masuk",
            key: "2",
            children: <TabUangMasuk />,
          },
          {
            label: "Catatan Uang Keluar",
            key: "3",
            children: <TabUangKeluar />,
          },
        ]}
      />
    </div>
  );
};

export default Rekening;
