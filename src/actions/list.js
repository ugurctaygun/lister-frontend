import {
  CREATE_LIST,
  LIST_LOADED,
  DELETE_LIST,
  LIST_ERROR,
  LISTS_LOADED,
  ADD_COMMENT,
  REMOVE_COMMENT,
  FILTER_LISTS,
} from "./types";
import { setAlert } from "./alert";

import axios from "axios";

//Create a new list
export const createList = ({ title, tag, content, name }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ title, tag, content, name });

  try {
    const res = await axios.post("/api/lists", body, config);

    dispatch({
      type: CREATE_LIST,
      payload: res.data,
    });

    dispatch(setAlert("List Created", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }
  }
};

//Load lists
export const loadList = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/lists");

    dispatch({
      type: LISTS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }
  }
};

//Load single list from url param
export const loadListById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/lists/${id}`);

    dispatch({
      type: LIST_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }
  }
};

//Delete list
export const deleteList = (id) => async (dispatch) => {
  try {
    await axios
      .create({
        baseURL: "/api",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .delete(`/lists/${id}`);

    dispatch({
      type: DELETE_LIST,
      payload: id,
      loading: false,
    });

    dispatch(setAlert("List Removed", "success"));
  } catch (error) {
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: "Server Error",
      },
    });
  }
};

//Filter Lists
export const filterList = (text) => (dispatch) => {
  try {
    dispatch({
      type: FILTER_LISTS,
      payload: text,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: LIST_ERROR,
      payload: {
        msg: "Server Error",
      },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios
      .create({
        baseURL: "/api",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .post(`/lists/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios
      .create({
        baseURL: "/api",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .delete(`/lists/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }
  }
};
