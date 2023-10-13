let initialState = {
  Pengajars: [],
  Pengajar: {},
};

function PengajarReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllPengajar":
      return {
        ...state,
        Pengajars: actions.payload,
      };

    case "Fetch/GetOnePengajar":
      return {
        ...state,
        Pengajar: actions.payload,
      };

    default:
      return state;
  }
}

export default PengajarReducer;
