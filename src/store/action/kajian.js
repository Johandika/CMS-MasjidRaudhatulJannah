import axios from "axios";
const BaseUrl = "http://localhost:3000";

export function fetchKategoriKajian() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kategoriKajian`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      dispatch({
        type: "Fetch/GetAllKategoriKajian",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchKajianRutin() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/rutin`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      dispatch({
        type: "Fetch/GetAllKajianRutin",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchKajianTablighAkbar() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/tablighAkbar`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      dispatch({
        type: "Fetch/GetAllKajianTablighAkbar",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
