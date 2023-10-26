const BaseUrl = "http://localhost:3000";
import axios from "axios";

export function getAllPengajar(search) {
  return async (dispatch) => {
    try {
      const queryParams = {
        limit: 50,
      };

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios.get(`${BaseUrl}/pengajarTahsin`, {
        headers: {
          api_key: "masjidraudhatuljannah",
        },
        params: queryParams,
      });

      dispatch({
        type: "Fetch/GetAllPengajar",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getOnePengajar(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pengajarTahsin/${id}`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
      });

      dispatch({
        type: "Fetch/GetOnePengajar",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createPengajar(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pengajarTahsin`,
        method: "POST",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
        data: body,
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

export function updatePengajar(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pengajarTahsin/${id}`,
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

export function updateStatusPengajar(id, status) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pengajarTahsin/status/${id}`,
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

export function deletePengajar(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/pengajarTahsin/${id}`,
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
