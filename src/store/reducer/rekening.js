let initialState = {
  Rekenings: [],
  Rekening: {},
  UangMasuks: [],
  UangMasuk: {},
  UangKeluars: [],
  UangKeluar: {},
};

function RekeningReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllRekening":
      return {
        ...state,
        Rekenings: actions.payload,
      };

    case "Fetch/GetOneRekening":
      return {
        ...state,
        Rekening: actions.payload,
      };

    case "Fetch/GetAllUangMasuk":
      return {
        ...state,
        UangMasuks: actions.payload,
      };

    case "Fetch/GetOneUangMasuk":
      return {
        ...state,
        UangMasuk: actions.payload,
      };

    case "Fetch/GetAllUangKeluar":
      return {
        ...state,
        UangKeluars: actions.payload,
      };

    case "Fetch/GetOneUangKeluar":
      return {
        ...state,
        UangKeluar: actions.payload,
      };

    default:
      return state;
  }
}

export default RekeningReducer;
