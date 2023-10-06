export const setTabsValue = (value) => {
  console.log(value);
  return {
    type: "SET_TAB_VALUE",
    payload: value,
  };
};
