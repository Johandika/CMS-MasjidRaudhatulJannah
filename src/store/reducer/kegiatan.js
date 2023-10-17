let initialState = {
  Kegiatans: [],
  Kegiatan: {},
};

function KegiatanReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllKegiatan":
      return {
        ...state,
        Kegiatans: actions.payload,
      };

    case "Fetch/GetOneKegiatan":
      return {
        ...state,
        Kegiatan: actions.payload,
      };

    default:
      return state;
  }
}

export default KegiatanReducer;
