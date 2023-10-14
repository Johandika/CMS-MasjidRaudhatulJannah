import axios from "axios";

const BaseUrl = "http://localhost:3000";

export function fetchRekening() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/rekening`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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
