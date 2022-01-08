import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./constants";

import { loginServices } from "../../../Services/auth-services";

export const login = (data) => (dispatch) => {
  return loginServices(data).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve(data);
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject(error);
    }
  );
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
  });
};
