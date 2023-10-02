const BaseUrl = "http://localhost:3000";
import axios from "axios";
import { message } from "antd";

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

export function addPengajar(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pengajarTahsin`,
        method: "POST",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
        data: body,
      });

      dispatch(fetchPengajar());
      message.loading("Loading...", 1, () => {
        message.success(data.message);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
