const BaseUrl = "http://localhost:3000";
import axios from "axios";
import { message } from "antd";

export function FetchKelasTahsinDewasa() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinDewasa`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
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

export function FetchKelasTahsinAnak() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinAnak`,
        method: "GET",
        headers: {
          api_key: "masjidraudhatuljannah",
        },
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

export function getOneKelasAnak(id) {
  return async (dispatch) => {
    try {
      console.log(id);
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinAnak/${id}`,
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

export function addKelasAnak(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinAnak`,
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

export function editKelasAnak(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinAnak/${id}`,
        method: "PATCH",
        data: body,
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      });
    } catch (error) {
      return error;
    }
  };
}

export function deleteKelasAnak(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${BaseUrl}/kelasTahsinAnak/${id}`,
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
