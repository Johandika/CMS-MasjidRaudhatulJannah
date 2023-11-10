import { Tabs } from "antd";
import TabLayanan from "../components/layanan/TabLayanan";

const Layanan = () => {
  return (
    <div className="w-full h-full px-5">
      <Tabs
        className=""
        type="line"
        size="large"
        defaultActiveKey="1"
        items={[
          {
            label: "Layanan",
            key: "1",
            children: <TabLayanan />,
          },
        ]}
      />
    </div>
  );
};

export default Layanan;
