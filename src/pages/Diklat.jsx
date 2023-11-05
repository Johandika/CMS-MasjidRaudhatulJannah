import { Tabs } from "antd";
import TabDiklat from "../components/diklat/TabDiklat";
import TabPesertaDiklat from "../components/diklat/TabPesertaDiklat";

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
            label: "Diklat",
            key: "1",
            children: <TabDiklat />,
          },
          {
            label: "Peserta Diklat",
            key: "2",
            children: <TabPesertaDiklat />,
          },
        ]}
      />
    </div>
  );
};

export default Divisi;
