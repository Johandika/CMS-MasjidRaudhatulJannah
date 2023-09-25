import axios from "axios";

const BaseUrl = "http://localhost:3000";

export function fetchUstadz() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/ustadz`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      dispatch({
        type: "Fetch/GetAllUstadz",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
