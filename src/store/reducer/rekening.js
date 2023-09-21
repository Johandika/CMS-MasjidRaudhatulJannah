let initialState = {
  Rekenings: [],
  Rekening: {},
};

function RekeningReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllRekening":
      return {
        ...state,
        Rekenings: actions.payload,
      };

    default:
      return state;
  }
}

export default RekeningReducer;
