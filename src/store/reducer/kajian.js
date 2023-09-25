let initialState = {
  KategoriKajians: [],
  KajianRutins: [],
  KajianTablighAkbars: [],
  KajianRutin: {},
  KajianTablighAkbar: {},
};

function KajianReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllKategoriKajian":
      return {
        ...state,
        KategoriKajians: actions.payload,
      };
    case "Fetch/GetAllKajianRutin":
      return {
        ...state,
        KajianRutins: actions.payload,
      };
    case "Fetch/GetAllKajianTablighAkbar":
      return {
        ...state,
        KajianTablighAkbars: actions.payload,
      };

    default:
      return state;
  }
}
export default KajianReducer;
