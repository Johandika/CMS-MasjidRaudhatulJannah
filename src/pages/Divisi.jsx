import { Tabs } from "antd";
import TabDivisi from "../components/divisi/TabDivisi";
import TabKegiatan from "../components/divisi/TabKegiatan";

const Divisi = () => {
  return (
    <div className="w-full h-full px-5">
      <Tabs
        className=""
        type="line"
        size="large"
        defaultActiveKey="1"
        items={[
          {
            label: "Divisi",
            key: "1",
            children: <TabDivisi />,
          },
          {
            label: "Kegiatan",
            key: "2",
            children: <TabKegiatan />,
          },
        ]}
      />
    </div>
  );
};

export default Divisi;
