let initialState = {
  Divisis: [],
  Divisi: {},
};

function DivisiReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllDivisi":
      return {
        ...state,
        Divisis: actions.payload,
      };

    case "Fetch/GetOneDivisi":
      return {
        ...state,
        Divisi: actions.payload,
      };

    default:
      return state;
  }
}

export default DivisiReducer;
