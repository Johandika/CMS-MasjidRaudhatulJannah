import axios from "axios";
const BaseUrl = "http://localhost:3000";

export function getAllPesertaTahsinAnak() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pesertaTahsinAnak`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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

export function getAllPesertaTahsinDewasa() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pesertaTahsinDewasa`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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
