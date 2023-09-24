import axios from "axios";

const BaseUrl = "http://localhost:3000";

export function fetchRekening() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/rekening`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      dispatch({
        type: "Fetch/GetAllRekening",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
