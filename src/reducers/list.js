import {
  CREATE_LIST,
  LIST_LOADED,
  LISTS_LOADED,
  DELETE_LIST,
  LIST_ERROR,
  ADD_COMMENT,
  REMOVE_COMMENT,
  FILTER_LISTS,
} from "../actions/types";

const initialState = {
  lists: [],
  list: null,
  title: "",
  tag: "",
  content: [],
  bookmarks: [],
  name: "",
  loading: true,
  error: {},
  filteredLists: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LIST:
      return {
        ...state,
        ...payload,
        title: payload.title,
        tag: payload.tag,
        content: payload.content,
        name: payload.name,
        loading: false,
      };
    case LIST_LOADED:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case LISTS_LOADED:
      return {
        ...state,
        lists: payload,
        loading: false,
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== payload),
        loading: false,
      };
    case FILTER_LISTS:
      let newState = Object.assign({}, state);
      let filteredLists = state.lists.filter((item) => {
        return item.tag.includes(payload);
      });
      newState.filteredLists = filteredLists;

      return newState;
    case LIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        list: { ...state.list, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        list: {
          ...state.list,
          comments: state.list.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };

    default:
      return state;
  }
}
