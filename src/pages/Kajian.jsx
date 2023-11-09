import { Tabs } from "antd";
import TabUstadz from "../components/kajian/TabUstadz";
import TabKategoriKajian from "../components/kajian/TabKategoriKajian";
import TabKajianRutin from "../components/kajian/TabKajianRutin";
import TabTablighAkbar from "../components/kajian/TabTablighAkbar";
import TabLinkKajianRutin from "../components/kajian/TabLinkKajianRutin";

const Tahsin = () => {
  return (
    <div className="w-full h-full px-5">
      <Tabs
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
          {
            label: "Kajian Rutin",
            key: "3",
            children: <TabKajianRutin />,
          },
          {
            label: "Tabligh Akbar",
            key: "4",
            children: <TabTablighAkbar />,
          },
          {
            label: "Link Kajian Rutin",
            key: "5",
            children: <TabLinkKajianRutin />,
          },
        ]}
      />
    </div>
  );
};

export default Tahsin;
