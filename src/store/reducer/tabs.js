const initialState = {
  TabsValues: "",
};

function TabsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TAB_VALUE":
      return {
        ...state,
        TabsValues: action.payload,
      };
    default:
      return state;
  }
}

export default TabsReducer;
