import axios from "axios";
import { message } from "antd";
import { config } from "../../configs";

//! KelasDewasa
export function getAllKelasTahsinDewasa(search) {
  return async (dispatch) => {
    try {
      const queryParams = {};

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinDewasa`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
        params: queryParams,
      });
      dispatch({
        type: "Fetch/GetAllKelasTahsinDewasa",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneKelasTahsinDewasa(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinDewasa/`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOneKelasTahsinDewasa",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createKelasTahsinDewasa(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinDewasa`,
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

export function updateKelasTahsinDewasa(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinDewasa/${id}`,
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

export function updateStatusKelasTahsinDewasa(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinDewasa/status/${id}`,
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

export function deleteKelasTahsinDewasa(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinDewasa/${id}`,
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

//! KelasAnak

export function getAllKelasTahsinAnak(search) {
  return async (dispatch) => {
    try {
      const queryParams = {
        limit: 50,
      };

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinAnak`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
        params: queryParams,
      });

      dispatch({
        type: "Fetch/GetAllKelasTahsinAnak",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneKelasTahsinAnak(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinAnak/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });
      dispatch({
        type: "Fetch/GetOneKelasTahsinAnak",
        payload: data,
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

export function addKelasTahsinAnak(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinAnak`,
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

export function updateKelasTahsinAnak(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinAnak/${id}`,
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

export function updateStatusKelasTahsinAnak(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinAnak/status/${id}`,
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

export function deleteKelasTahsinAnak(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/kelasTahsinAnak/${id}`,
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
