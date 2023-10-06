import { Tabs } from "antd";

const initialState = {
  Tabs: "",
};

function TabsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TAB_VALUE":
      return {
        ...state,
        Tabs: action.payload,
      };
    default:
      return state;
  }
}

export default TabsReducer;
