import axios from "axios";
const BaseUrl = "http://localhost:3000";

export function getAllKategoriKajian() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kategoriKajian`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetAllKategoriKajian",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllKajianRutin() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/rutin`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });
      dispatch({
        type: "Fetch/GetAllKajianRutin",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllKajianTablighAkbar() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/tablighAkbar`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });
      dispatch({
        type: "Fetch/GetAllKajianTablighAkbar",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneKajian(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });
      dispatch({
        type: "Fetch/GetOneKajian",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createKajian(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian`,
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

export function updateKajian(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/${id}`,
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

export function updateStatusKajian(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/status/${id}`,
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

export function deleteKajian(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kajian/${id}`,
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

//! Link Kajian

export function getAllLinkKajian() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/linkKajian`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetAllLinkKajian",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllLinkKajianByKajianId(KajianId) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/linkKajian/${KajianId}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetAllLinkKajianByKajianId",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOneLinkKajian(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/linkKajian/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOneLinkKajian",
        payload: data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function createLinkKajian(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/linkKajian`,
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

export function updateLinkKajian(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/linkKajian/${id}`,
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

export function deleteLinkKajian(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/linkKajian/${id}`,
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
