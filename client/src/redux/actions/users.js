import { usersApi } from "../../api";
import { SET_IS_USERS_LOADING, SET_USERS } from "../reducers/users";
import { logout } from "./auth";
import { setError } from "./messages";

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setIsUsersLoading = (isLoading) => ({
  type: SET_IS_USERS_LOADING,
  payload: isLoading,
});

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(setIsUsersLoading(true));
    const data = await usersApi.getUsers();

    if (data.error === 0) {
      dispatch(setUsers(data.users));
    } else {
      if (data.isWrongToken) {
        dispatch(logout());
        dispatch(setError("Ваша сессия истекла"));
      }
      dispatch(setError(data.message));
    }
    dispatch(setIsUsersLoading(false));
  } catch (e) {
    dispatch(
      setError("Произошла ошибка при загрузке потребителей, попробуйте позже")
    );
  }
};
