let initialState = {
  PesertaDiklats: [],
  PesertaDiklat: {},
};

function PesertaDiklatReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllPesertaDiklat":
      return {
        ...state,
        PesertaDiklats: actions.payload,
      };

    case "Fetch/GetOnePesertaDiklat":
      return {
        ...state,
        PesertaDiklat: actions.payload,
      };

    default:
      return state;
  }
}

export default PesertaDiklatReducer;
