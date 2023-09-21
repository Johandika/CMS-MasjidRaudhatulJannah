import axios from "axios";
const BaseUrl = "http://localhost:3000";

export function fetchKajianRutin() {
  return async (dispatch) => {
    try {
      const dataKajianRutin = await axios({
        url: `${BaseUrl}/kajian`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
      console.log(dataKajianRutin);
      dispatch({
        type: "Fetch/GetAllKajianRutin",
        payload: dataKajianRutin,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
