import axios from "axios";
import { config } from "../../configs";

//! Rekening

export function getAllRekening(search) {
  return async (dispatch) => {
    try {
      const queryParams = {
        limit: 50,
      };

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios({
        url: `${config.api_host_dev}/rekening`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
        params: queryParams,
      });

      dispatch({
        type: "Fetch/GetAllRekening",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneRekening(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/rekening/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetOneRekening",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createRekening(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/rekening`,
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

export function updateRekening(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/rekening/${id}`,
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

export function deleteRekening(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/rekening/${id}`,
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

//! Uang Masuk

export function getAllUangMasuk() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangMasuk`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetAllUangMasuk",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneUangMasuk(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangMasuk/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetOneUangMasuk",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createUangMasuk(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangMasuk`,
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

export function updateUangMasuk(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangMasuk/${id}`,
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

export function deleteUangMasuk(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangMasuk/${id}`,
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

//! Uang Keluar

export function getAllUangKeluar() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangKeluar`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetAllUangKeluar",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneUangKeluar(id) {
  return async (dispatch) => {
    w;
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangKeluar/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
        },
      });

      dispatch({
        type: "Fetch/GetOneUangKeluar",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createUangKeluar(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangKeluar`,
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

export function updateUangKeluar(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangKeluar/${id}`,
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

export function deleteUangKeluar(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${config.api_host_dev}/uangKeluar/${id}`,
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
