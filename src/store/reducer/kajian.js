let initialState = {
  KajianRutins: [],
  KajianTematiks: [],
  KajianRutin: {},
  KajianTematik: {},
};

function KajianReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllKajianRutin":
      return {
        ...state,
        KajianRutins: actions.payload,
      };

    default:
      return state;
  }
}
export default KajianReducer;
