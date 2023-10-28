export const setTabsValue = (value) => {
  console.log("value", value);
  return {
    type: "SET_TAB_VALUE",
    payload: value,
  };
};
