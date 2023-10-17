let initialState = {
  Layanans: [],
  layanan: {},
};

function LayananReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllLayanan":
      return {
        ...state,
        Layanans: actions.payload,
      };

    case "Fetch/GetOneLayanan":
      return {
        ...state,
        Layanan: actions.payload,
      };

    default:
      return state;
  }
}

export default LayananReducer;
