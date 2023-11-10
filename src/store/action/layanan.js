import axios from "axios";
import { config } from "../../configs";

export function getAllLayanan(search) {
  return async (dispatch) => {
    let queryParams = {};

    if (search) {
      queryParams.search = search;
    }

    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/layanan`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
        params: queryParams,
      });

      dispatch({
        type: "Fetch/GetAllLayanan",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneLayanan(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/layanan/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetOneLayanan",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createLayanan(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/layanan`,
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

export function updateLayanan(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/layanan/${id}`,
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

export function updateStatusLayanan(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/layanan/status/${id}`,
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

export function deleteLayanan(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/layanan/${id}`,
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
