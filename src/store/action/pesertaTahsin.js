import axios from "axios";
const BaseUrl = "http://localhost:3000";

export function FetchPesertaTahsinAnak() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pesertaTahsinAnak`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      dispatch({
        type: "Fetch/GetAllPesertaTahsinAnak",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function FetchPesertaTahsinDewasa() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pesertaTahsinDewasa`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      dispatch({
        type: "Fetch/GetAllPesertaTahsinDewasa",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
