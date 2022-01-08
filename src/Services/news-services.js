import axios from "axios";

import { API_URL } from "../Utils/Api";
import { authHeader } from "./auth-header";

export const getAllNews = () => {
  return axios.get(`${API_URL}news`, {
    headers: authHeader(),
  });
};

export const postNews = (data) => {
  return axios.post(`${API_URL}news`, data, {
    headers: authHeader(),
  });
};

export const getNewsDetails = (id) => {
  return axios.get(`${API_URL}news/${id}`, {
    headers: authHeader(),
  });
};

export const updateNews = (id, data) => {
  return axios.put(`${API_URL}news/${id}`, data, {
    headers: authHeader(),
  });
};

export const deleteNews = (id) => {
  return axios.delete(`${API_URL}news/${id}`, {
    headers: authHeader(),
  });
};
