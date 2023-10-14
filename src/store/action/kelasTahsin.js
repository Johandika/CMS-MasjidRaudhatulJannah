const BaseUrl = "http://localhost:3000";
import axios from "axios";
import { message } from "antd";

export function getAllKelasTahsinDewasa() {
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

export function getAllKelasTahsinAnak() {
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

export function getOneKelasTahsinAnak(id) {
  return async (dispatch) => {
    try {
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

export function addKelasTahsinAnak(body) {
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

export function editKelasTahsinAnak(id, body) {
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
