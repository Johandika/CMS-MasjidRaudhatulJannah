import axios from "axios";
import { config } from "../../configs";

export function getAllPesertaDiklat(search) {
  return async (dispatch) => {
    try {
      let queryParams = {};

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
        params: queryParams,
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
          apikey: `${config.api_key}`,
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
      const formData = new FormData();

      for (const key in body) {
        formData.append(key, body[key]);
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
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
      const formData = new FormData();

      for (const key in body) {
        formData.append(key, body[key]);
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaDiklat/${id}`,
        method: "PATCH",
        data: formData,
        headers: {
          authorization: localStorage.getItem("authorization"),
          "Content-Type": "multipart/form-data",
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
