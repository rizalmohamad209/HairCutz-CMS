import axios from "axios";

import { API_URL } from "../Utils/Api";
import { authHeader } from "./auth-header";

export const loginServices = (data) => {
  return axios.post(`${API_URL}signin`, data).then((data) => {
    if (data.status === 200) {
      localStorage.setItem("user", JSON.stringify(data.data.data));
      return data.data.data;
    }
  });
};

export const signUpService = (data) => {
  return axios.post(`${API_URL}signup`, data);
};

export const getDetailUser = () => {
  return axios.get(`${API_URL}user`, {
    headers: authHeader(),
  });
};

export const updateUser = (data) => {
  return axios.put(`${API_URL}user`, data, {
    headers: authHeader(),
  });
};
