import { SET_ERROR, SET_MESSAGE } from "../reducers/messages";

export const setError = (error) => ({ type: SET_ERROR, payload: error });

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});
