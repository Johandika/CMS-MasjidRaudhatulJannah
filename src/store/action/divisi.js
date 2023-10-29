import axios from "axios";
import { config } from "../../configs";

export function getAllDivisi() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/divisi`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
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
        url: `${config.api_host_dev}/divisi/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
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

export function createDivisi(body) {
  return async () => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/divisi`,
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

export function updateDivisi(id, body) {
  return async () => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/divisi/${id}`,
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
  return async () => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/divisi/status/${id}`,
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
  return async () => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/divisi/${id}`,
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
