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
} from "./types";

import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Account Registered", "success"));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Log Out
export const logOut = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};

// Add bookmarks
export const addBookmark = (userID, listID) => async (dispatch) => {
  try {
    const res = await axios
      .create({
        baseURL: "/api",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .post(`/users/${userID}/bookmarks/`, listID);

    dispatch({
      type: ADD_BOOKMARK,
      payload: res.data,
    });

    dispatch(setAlert("Added to Favorites", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }
  }
};

// Delete bookmark
export const removeBookmark = (userID, bookID, listID) => async (dispatch) => {
  try {
    await axios
      .create({
        baseURL: "/api",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .delete(`/users/${userID}/bookmarks/${bookID}/${listID}`);

    dispatch({
      type: REMOVE_BOOKMARK,
      payload: bookID,
    });

    dispatch(setAlert("Removed from Favorites", "warning"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }
  }
};
