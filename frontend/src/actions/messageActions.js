import axios from "axios";
import {
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_FAIL,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_CREATE_FAIL,
  MESSAGE_CREATE_NULL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_LIST_NULL,
} from "../constants/messageConstants";

export const createGroup = (userIds, content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROUP_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/message/group/create/`,
      { users: userIds, content: content },
      config
    );
    dispatch({
      type: GROUP_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GROUP_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listGroups = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROUP_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/message/group/list/${id}/`, config);
    dispatch({
      type: GROUP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GROUP_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const messageCreate = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(value);
    const { data } = await axios.post(`/api/message/create/`, value, config);
    dispatch({
      type: MESSAGE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listMessages = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/message/list/${id}/`, config);
    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
