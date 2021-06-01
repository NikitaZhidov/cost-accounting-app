import { iconsApi } from "../../api";
import { SET_ICONS } from "../reducers/icons";
import { setError } from "./messages";

export const setIcons = (icons) => ({
  type: SET_ICONS,
  payload: icons,
});

export const fetchIcons = () => async (dispatch) => {
  try {
    const data = await iconsApi.getIcons();
    if (data.error === 0) {
      dispatch(setIcons(data.icons));
    } else {
      dispatch(setError(data.message));
    }
  } catch (e) {
    dispatch(
      setError(
        "Произошла ошибка при загрузке иконок категорий, попробуйте позже"
      )
    );
  }
};
