import axios from "axios";
import { config } from "../../configs";

export function getAllKegiatan(search) {
  return async (dispatch) => {
    try {
      let queryParams = {};

      if (search) {
        queryParams.search = search;
      }
      const { data } = await axios({
        url: `${config.api_host_dev}/kegiatan`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetAllKegiatan",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneKegiatan(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kegiatan/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetOneKegiatan",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createKegiatan(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kegiatan`,
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

export function updateKegiatan(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kegiatan/${id}`,
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

export function updateStatusKegiatan(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kegiatan/status/${id}`,
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

export function updateHeadlineKegiatan(id, headline) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kegiatan/headline/${id}`,
        method: "PATCH",
        data: { headline: headline },
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

export function deleteKegiatan(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kegiatan/${id}`,
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
