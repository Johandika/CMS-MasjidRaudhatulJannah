import axios from "axios";

const BaseUrl = "http://localhost:3000";

export function fetchDivisi() {
  return async (dispatch) => {
    try {
      const dataDivisi = await axios({
        url: `${BaseUrl}/divisi`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      console.log(dataDivisi);

      dispatch({
        type: "Fetch/GetAllDivisi",
        payload: dataDivisi,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
