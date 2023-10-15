const BaseUrl = "http://localhost:300x0";
import axios from "axios";

export function getAllDivisi() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/divisi`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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

export function getOneDivisi(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/divisi/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOneDivisi",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function addDivisi(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/divisi`,
        method: "POST",
        data: body,
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

export function editDivisi(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/divisi/${id}`,
        method: "PATCH",
        data: body,
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

export function updateStatusDivisi(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/divisi/status/${id}`,
        method: "PATCH",
        data: { status_aktif: status },
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

export function deleteDivisi(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/divisi/${id}`,
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}
