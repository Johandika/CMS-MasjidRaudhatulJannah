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

    default:
      return state;
  }
}

export default DivisiReducer;
