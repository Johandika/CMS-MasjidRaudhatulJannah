let initalState = {
  Ustadzs: [],
  Ustadz: {},
};

function UstadzReducer(state = initalState, actions) {
  switch (actions.type) {
    case "Fetch/GetAllUstadz":
      return {
        ...state,
        Ustadzs: actions.payload,
      };

    default:
      return state;
  }
}

export default UstadzReducer;
