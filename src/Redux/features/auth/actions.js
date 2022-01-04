import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./constants";

import { loginServices } from "../../../Services/auth-services";

export const login = (data) => (dispatch) => {
  return loginServices(data).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data },
      });
      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.error ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject(message);
    }
  );
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
  });
};
