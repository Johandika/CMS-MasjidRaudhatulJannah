let initialState = {
  Diklats: [],
  Diklat: {},
};

function DiklatReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllDiklat":
      return {
        ...state,
        Diklats: actions.payload,
      };

    case "Fetch/GetOneDiklat":
      return {
        ...state,
        Diklat: actions.payload,
      };

    default:
      return state;
  }
}

export default DiklatReducer;
