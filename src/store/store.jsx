import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import PengajarReducer from "./reducer/pengajar";
import DivisiReducer from "./reducer/divisi";
import KajianReducer from "./reducer/kajian";
import RekeningReducer from "./reducer/rekening";
import KelasTahsinReducer from "./reducer/kelasTahsin";
import PesertaTahsinReducer from "./reducer/pesertaTahsin";
import UstadzReducer from "./reducer/ustadz";
import TabsReducer from "./reducer/tabs";

import DiklatReducer from "./reducer/diklat";
import KegiatanReducer from "./reducer/kegiatan";
import LayananReducer from "./reducer/layanan";
import PesertaDiklatReducer from "./reducer/pesertaDiklat";

let reducer = combineReducers({
  PengajarReducer,
  DivisiReducer,
  KajianReducer,
  RekeningReducer,
  KelasTahsinReducer,
  PesertaTahsinReducer,
  UstadzReducer,
  TabsReducer,
  DiklatReducer,
  KegiatanReducer,
  LayananReducer,
  PesertaDiklatReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
