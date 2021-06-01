import {
  SET_USER,
  SET_ACTIVE_TAB,
  LOGOUT,
  SET_IS_LOADING,
  SET_IS_AUTH_LOADING,
} from "../reducers/auth";
import { authApi } from "../../api/";
import { setError, setMessage } from "./messages";

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const setActiveTab = (tab) => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});

export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setIsAuthLoading = (isLoading) => ({
  type: SET_IS_AUTH_LOADING,
  payload: isLoading,
});

export const register = ({ email, password, nickname }) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await authApi.register(email, password, nickname);
    if (res.error === 0) {
      dispatch(setMessage(res.message));
    } else {
      dispatch(setError(res.message));
    }
  } catch (e) {
    dispatch(setError("Ошибка, попробуйте позже"));
    throw e;
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await authApi.login(email, password);
    if (res.error === 0) {
      localStorage.setItem("token", res.token);
      dispatch(setUser(res.user));
    } else {
      dispatch(setError(res.message));
    }
  } catch (e) {
    dispatch(setError("Ошибка, попробуйте позже"));
    throw e;
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const auth = () => async (dispatch) => {
  try {
    dispatch(setIsAuthLoading(true));
    const res = await authApi.auth();
    if (res.error === 0) {
      dispatch(setUser(res.user));
      localStorage.setItem("token", res.token);
    } else {
      if (res.isWrongToken) {
        dispatch(setError("Ваша сессия истекла"));
      } else {
        dispatch(setIsAuthLoading(true));
        dispatch(setError(res.message));
      }
    }
  } catch (e) {
    dispatch(setIsAuthLoading(true));
    dispatch(setError("Ошибка, попробуйте позже"));
    throw e;
  } finally {
    dispatch(setIsAuthLoading(false));
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};
