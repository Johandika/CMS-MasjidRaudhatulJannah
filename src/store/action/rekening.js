import axios from "axios";

const BaseUrl = "http://localhost:3000";

//! Rekening

export function getAllRekening() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/rekening`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
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
        url: `${BaseUrl}/rekening/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOneRekening",
        payload: data,
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

export function createRekening(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/rekening`,
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
        url: `${BaseUrl}/rekening/${id}`,
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
        url: `${BaseUrl}/rekening/${id}`,
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
        url: `${BaseUrl}/uangMasuk`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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
    w;
    try {
      const { data } = await axios({
        url: `${BaseUrl}/uangMasuk/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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
        url: `${BaseUrl}/uangMasuk`,
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
        url: `${BaseUrl}/uangMasuk/${id}`,
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
        url: `${BaseUrl}/uangMasuk/${id}`,
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
        url: `${BaseUrl}/uangKeluar`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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
        url: `${BaseUrl}/uangKeluar/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
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
        url: `${BaseUrl}/uangKeluar`,
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
        url: `${BaseUrl}/uangKeluar/${id}`,
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
        url: `${BaseUrl}/uangKeluar/${id}`,
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
