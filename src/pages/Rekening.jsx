// import { useDispatch } from "react-redux";
import { Tabs } from "antd";
import TabRekening from "../components/rekening/TabRekening";

const Rekening = () => {
  // const dispatch = useDispatch();

  // const { TabsValues } = useSelector((state) => state.TabsReducer);

  // const handleChangeTabs = (value) => {
  //   dispatch(setTabsValue(value));
  // };

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
        ]}
      />
    </div>
  );
};

export default Rekening;
