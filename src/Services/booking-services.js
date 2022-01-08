import axios from "axios";

import { API_URL } from "../Utils/Api";
import { authHeader } from "./auth-header";

export const getBooking = () => {
  console.log(authHeader());
  return axios.get(`${API_URL}bookMitra`, {
    headers: authHeader(),
  });
};

export const updateStatus = (id, data) => {
  return axios.put(`${API_URL}bookMitra/${id}`, data, {
    headers: authHeader(),
  });
};
