import axios from "axios";

const BaseUrl = "http://localhost:3000";

export function fetchDivisi() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/divisi`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      dispatch({
        type: "Fetch/GetAllDivisi",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
