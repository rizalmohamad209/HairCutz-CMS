import axios from "axios";

import { API_URL } from "../Utils/Api";
import { authHeader } from "./auth-header";

export const getBooking = () => {
  return axios.get(`${API_URL}bookMitra`, {
    headers: authHeader(),
  });
};
