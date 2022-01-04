import axios from "axios";

import { API_URL } from "../Utils/Api";

export const loginServices = (data) => {
  return axios.post(`${API_URL}signin`, data).then((data) => {
    if (data.status === 200) {
      localStorage.setItem("user", JSON.stringify(data.data.data));
      return data.data.data;
    }
  });
};

export const signUpService = (data) => {
  return axios.post(`${API_URL}signup`, data).then((data) => {
    if (data.status === 200) {
      localStorage.setItem("id_mitra", JSON.stringify(data.data.data.id_user));
    }
  });
};
