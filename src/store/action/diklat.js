import axios from "axios";
import { config } from "../../configs";

export function getAllDiklat(search) {
  return async (dispatch) => {
    try {
      let queryParams = {};

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/diklat`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
        params: queryParams,
      });

      dispatch({
        type: "Fetch/GetAllDiklat",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneDiklat(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/diklat/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetOneDiklat",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createDiklat(body) {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        formData.append(key, body[key]);
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/diklat`,
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

export function updateDiklat(id, body) {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        formData.append(key, body[key]);
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/diklat/${id}`,
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

export function updateStatusDiklat(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/diklat/status/${id}`,
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

export function deleteDiklat(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/diklat/${id}`,
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
