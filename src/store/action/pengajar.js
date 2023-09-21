const BaseUrl = "http://localhost:3000";
import axios from "axios";

export function fetchPengajar() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BaseUrl}/pengajarTahsin`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      dispatch({
        type: "Fetch/GetAllPengajar",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
