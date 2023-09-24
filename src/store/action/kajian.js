import axios from "axios";
const BaseUrl = "http://localhost:3000";

export function fetchKajianRutin() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian`,
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
