const BaseUrl = "http://localhost:3000";
import axios from "axios";

export function FetchKelasTahsinDewasa() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinDewasa`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      dispatch({
        type: "Fetch/GetAllKelasTahsinDewasa",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function FetchKelasTahsinAnak() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinAnak`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      dispatch({
        type: "Fetch/GetAllKelasTahsinAnak",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
