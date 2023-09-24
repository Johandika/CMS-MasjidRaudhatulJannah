import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import PengajarReducer from "./reducer/pengajar";
import DivisiReducer from "./reducer/divisi";
import KajianReducer from "./reducer/kajian";
import RekeningReducer from "./reducer/rekening";
import KelasTahsinReducer from "./reducer/kelasTahsin";

let reducer = combineReducers({
  PengajarReducer,
  DivisiReducer,
  KajianReducer,
  RekeningReducer,
  KelasTahsinReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
