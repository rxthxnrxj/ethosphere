import {
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_FAIL,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_NULL,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_CREATE_FAIL,
  MESSAGE_CREATE_NULL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_LIST_NULL,
} from "../constants/messageConstants";

export const groupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_CREATE_REQUEST:
      return { loading: true, success: false };

    case GROUP_CREATE_SUCCESS:
      return { loading: false, success: true };

    case GROUP_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export const groupListReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_LIST_REQUEST:
      return { loading: true };

    case GROUP_LIST_SUCCESS:
      return { loading: false, listOfGroups: action.payload };

    case GROUP_LIST_FAIL:
      return { loading: false, error: action.payload };

    case GROUP_LIST_NULL:
      return {};

    default:
      return state;
  }
};

export const messageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_CREATE_REQUEST:
      return { loading: true };

    case MESSAGE_CREATE_SUCCESS:
      return { loading: false, success: true };

    case MESSAGE_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };

    case MESSAGE_CREATE_NULL:
      return {};

    default:
      return state;
  }
};

export const messageListReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST:
      return { loading: true };

    case MESSAGE_LIST_SUCCESS:
      return { loading: false, messages: action.payload };

    case MESSAGE_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };

    case MESSAGE_LIST_NULL:
      return {};

    default:
      return state;
  }
};
