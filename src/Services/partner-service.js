import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from "../Utils/Api";

export const getAllPartner = () => {
  return axios.get(`${API_URL}mitra`, {
    headers: authHeader(),
  });
};

export const getDetailPartner = (id) => {
  return axios.get(`${API_URL}mitra/${id}`, {
    headers: authHeader(),
  });
};

export const postPartner = (data) => {
  return axios.post(`${API_URL}mitra`, data, {
    headers: authHeader(),
  });
};

export const updatePartner = (data) => {
  return axios.put(`${API_URL}mitra`, data, {
    headers: authHeader(),
  });
};

export const deleteMitra = (id) => {
  return axios.delete(`${API_URL}mitra/${id}`, {
    headers: authHeader(),
  });
};

export const detailMitra = () => {
  return axios.get(`${API_URL}mitraDetails`, {
    headers: authHeader(),
  });
};
