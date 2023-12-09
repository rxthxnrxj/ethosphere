import {
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_NULL,
} from "../constants/postConstants";

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true};

    case POST_CREATE_SUCCESS:
      return { loading: false, posts: action.payload};

    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case POST_NULL:
      return {};

    default:
      return state;
  }
};
