import axios from "axios";
import { config } from "../../configs";

export function getAllPengajar(search) {
  return async (dispatch) => {
    try {
      const queryParams = {
        limit: 50,
      };

      if (search) {
        queryParams.search = search;
      }

      const { data } = await axios.get(
        `${config.api_host_dev}/pengajarTahsin`,
        {
          headers: {
            apikey: "masjidraudhatuljannah",
          },
          params: queryParams,
        }
      );

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
        url: `${config.api_host_dev}/pengajarTahsin/${id}`,
        method: "GET",
        headers: {
          apikey: `${config.api_key}`,
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
        url: `${config.api_host_dev}/pengajarTahsin`,
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
        url: `${config.api_host_dev}/pengajarTahsin/${id}`,
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
        url: `${config.api_host_dev}/pengajarTahsin/status/${id}`,
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
        url: `${config.api_host_dev}/pengajarTahsin/${id}`,
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
