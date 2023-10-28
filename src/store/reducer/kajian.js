let initialState = {
  KategoriKajians: [],
  KategoriKajian: [],
  KajianRutins: [],
  KajianTablighAkbars: [],
  Kajian: {},
  LinkKajians: [],
  LinkKajianByKajianId: [],
  LinkKajian: {},
};

function KajianReducer(state = initialState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllKategoriKajian":
      return {
        ...state,
        KategoriKajians: actions.payload,
      };
    case "Fetch/GetOneKategoriKajian":
      return {
        ...state,
        KategoriKajian: actions.payload,
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

    case "Fetch/GetOneKajian":
      return {
        ...state,
        Kajian: actions.payload,
      };

    case "Fetch/GetAllLinkKajian":
      return {
        ...state,
        LinkKajians: actions.payload,
      };

    case "Fetch/GetAllLinkKajianByKajianId":
      return {
        ...state,
        LinkKajianByKajianId: actions.payload,
      };

    case "Fetch/GetOneLinkKajian":
      return {
        ...state,
        LinkKajian: actions.payload,
      };

    default:
      return state;
  }
}
export default KajianReducer;
