let initialState = {
  KelasTahsinDewasas: [],
  KelasTahsinDewasa: {},
  KelasTahsinAnaks: [],
  KelasTahsinAnak: {},
};

function KelasTahsinReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllKelasTahsinDewasa":
      return {
        ...state,
        KelasTahsinDewasas: actions.payload,
      };

    case "Fetch/GetOneKelasTahsinDewasa":
      return {
        ...state,
        KelasTahsinDewasa: actions.payload,
      };

    case "Fetch/GetAllKelasTahsinAnak":
      return {
        ...state,
        KelasTahsinAnaks: actions.payload,
      };

    case "Fetch/GetOneKelasTahsinAnak":
      return {
        ...state,
        KelasTahsinAnak: actions.payload,
      };

    default: {
      return state;
    }
  }
}

export default KelasTahsinReducer;
