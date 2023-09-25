let initalState = {
  PesertaTahsinDewasas: [],
  PesertaTahsinDewasa: {},
  PesertaTahsinAnaks: [],
  PesertaTahsinAnak: {},
};

function PesertaTahsinReducer(state = initalState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllPesertaTahsinAnak":
      return {
        ...state,
        PesertaTahsinAnaks: actions.payload,
      };

    case "Fetch/GetAllPesertaTahsinDewasa":
      return {
        ...state,
        PesertaTahsinDewasas: actions.payload,
      };

    default:
      return state;
  }
}

export default PesertaTahsinReducer;
