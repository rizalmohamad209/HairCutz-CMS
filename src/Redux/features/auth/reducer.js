import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./constants";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user, isAdmin: user.role }
  : { isLoggedIn: false, user: null, isAdmin: null };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        isAdmin: payload.user.role,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isAdmin: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isAdmin: null,
      };
    default:
      return state;
  }
};
