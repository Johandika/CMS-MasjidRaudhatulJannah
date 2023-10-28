import axios from "axios";
import { config } from "../../configs";

//! PesertaTahsinDewasa
export function getAllPesertaTahsinDewasa(search) {
  return async (dispatch) => {
    try {
      let queryParams = {};

      console.log(search);
      if (search) {
        queryParams.search = search;
      }
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinDewasa`,
        method: "GET",
        headers: {
          apikey: "masjidraudhatuljannah",
        },
        params: queryParams,
      });
      dispatch({
        type: "Fetch/GetAllPesertaTahsinDewasa",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOnePesertaTahsinDewasa(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinDewasa/${id}`,
        method: "GET",
        headers: {
          apikey: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOnePesertaTahsinDewasa",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createPesertaTahsinDewasa(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinDewasa`,
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

export function updatePesertaTahsinDewasa(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinDewasa/${id}`,
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

export function updateStatusPesertaTahsinDewasa(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinDewasa/status/${id}`,
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

export function deletePesertaTahsinDewasa(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinDewasa/${id}`,
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

//! PesertaTahsinAnak
export function getAllPesertaTahsinAnak(search) {
  return async (dispatch) => {
    try {
      let queryParams = {};

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinAnak`,
        method: "GET",
        headers: {
          apikey: "masjidraudhatuljannah",
        },
        params: queryParams,
      });

      dispatch({
        type: "Fetch/GetAllPesertaTahsinAnak",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOnePesertaTahsinAnak(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinAnak/${id}`,
        method: "GET",
        headers: {
          apikey: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOnePesertaTahsinAnak",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createPesertaTahsinAnak(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinAnak`,
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

export function updatePesertaTahsinAnak(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinAnak/${id}`,
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

export function updateStatusPesertaTahsinAnak(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinAnak/status/${id}`,
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

export function deletePesertaTahsinAnak(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/pesertaTahsinAnak/${id}`,
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
