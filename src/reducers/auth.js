import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        ...payload,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        user: { ...state.user, bookmarks: payload },
        loading: false,
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        user: {
          ...state.user,
          bookmarks: state.user.bookmarks.filter(
            (bookmark) => bookmark._id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
