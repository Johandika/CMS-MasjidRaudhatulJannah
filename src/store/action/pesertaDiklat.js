import axios from "axios";
import { config } from "../../configs";

export function getAllPesertaDiklat() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat`,
        method: "GET",
        headers: {
          apikey: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetAllPesertaDiklat",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOnePesertaDiklat(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat/${id}`,
        method: "GET",
        headers: {
          apikey: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOnePesertaDiklat",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createPesertaDiklat(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat`,
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

export function updatePesertaDiklat(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat/${id}`,
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

export function updateStatusPembayaranPesertaDiklat(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat/pembayaran/${id}`,
        method: "PATCH",
        data: { status_pembayaran: status },
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

export function updateStatusPesertaDiklat(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat/status/${id}`,
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

export function deletePesertaDiklat(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat/${id}`,
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
