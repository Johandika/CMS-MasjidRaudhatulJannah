import { Tabs } from "antd";
import TabUstadz from "../components/kajian/TabUstadz";
import TabKategoriKajian from "../components/kajian/TabKategoriKajian";

const Tahsin = () => {
  return (
    <div className="w-full h-full px-5">
      <Tabs
        className=""
        size="large"
        type="line"
        defaultActiveKey="1"
        items={[
          {
            label: "Ustadz",
            key: "1",
            children: <TabUstadz />,
          },
          {
            label: "Kategori Kajian",
            key: "2",
            children: <TabKategoriKajian />,
          },
          // {
          //   label: "Kelas Dewasa",
          //   key: "3",
          //   children: <TabKajianRutin />,
          // },
          // {
          //   label: "Peserta Anak",
          //   key: "4",
          //   children: <TabTablighAkbar />,
          // },
        ]}
      />
    </div>
  );
};

export default Tahsin;
