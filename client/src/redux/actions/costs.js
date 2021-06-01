import { costsApi } from "../../api/";
import {
  SET_COSTS,
  SET_CATEGORIES,
  ADD_COST,
  SET_IS_COSTS_LOADING,
  SET_IS_CATEGORIES_LOADING,
  SET_IS_CATEGORY_EDITING,
  DELETE_COST,
  SET_IS_COST_DELETING,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  UPLOAD_COSTS,
} from "../reducers/costs";
import { logout } from "./auth";
import { setError, setMessage } from "./messages";

export const deleteCategoryAccess = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});

export const editCategoryAccess = (payload) => ({
  type: EDIT_CATEGORY,
  payload,
});

export const setIsCostDeleting = (isDeleting) => ({
  type: SET_IS_COST_DELETING,
  payload: isDeleting,
});

export const setIsCategoryEditing = (isEditing) => ({
  type: SET_IS_CATEGORY_EDITING,
  payload: isEditing,
});

export const setIsCostsLoading = (isLoading) => ({
  type: SET_IS_COSTS_LOADING,
  payload: isLoading,
});

export const setIsCategoriesLoading = (isLoading) => ({
  type: SET_IS_CATEGORIES_LOADING,
  payload: isLoading,
});

export const setCosts = (costs) => ({ type: SET_COSTS, payload: costs });
export const uploadCosts = (costs) => ({ type: UPLOAD_COSTS, payload: costs });

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const addCostAccess = (payload) => ({
  type: ADD_COST,
  payload,
});

export const deleteCostAccess = (payload) => ({
  type: DELETE_COST,
  payload,
});

export const fetchCosts =
  (
    from = null,
    to = null,
    userId = null,
    count = null,
    page = null,
    isUpload = false
  ) =>
  async (dispatch) => {
    try {
      dispatch(setIsCostsLoading(true));
      const data = await costsApi.getCosts(from, to, userId, count, page);
      if (data.error === 0) {
        if (!isUpload) {
          dispatch(setCosts(data.costs));
        } else {
          dispatch(uploadCosts(data.costs));
        }
      } else {
        if (data.isWrongToken) {
          dispatch(logout());
          dispatch(setError("Ваша сессия истекла"));
        }
        dispatch(setError(data.message));
      }
      dispatch(setIsCostsLoading(false));
    } catch (e) {
      console.log(e);
      dispatch(
        setError("Произошла ошибка при загрузке расходов, попробуйте позже")
      );
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(setIsCategoriesLoading(true));
    const data = await costsApi.getCategories();
    if (data.error === 0) {
      dispatch(setCategories(data.categories));
    } else {
      if (data.isWrongToken) {
        dispatch(logout());
        dispatch(setError("Ваша сессия истекла"));
      }
      dispatch(setError(data.message));
    }
    dispatch(setIsCategoriesLoading(false));
  } catch (e) {
    dispatch(
      setError("Произошла ошибка при загрузке категорий, попробуйте позже")
    );
  }
};

export const addCost =
  ({ sum, category, date, costsId, comment }, countReloadCosts = null) =>
  async (dispatch) => {
    try {
      dispatch(setIsCostsLoading(true));
      const data = await costsApi.addCost({
        sum,
        category,
        date,
        costsId,
        comment,
      });
      if (data.error === 0) {
        dispatch(fetchCosts(null, null, null, countReloadCosts));
      } else {
        if (data.isWrongToken) {
          dispatch(logout());
          dispatch(setError("Ваша сессия истекла"));
        }
        dispatch(setError(data.message));
      }
    } catch (e) {
      dispatch(
        setError("Произошла ошибка при добавлении расходов, попробуйте позже")
      );
    }
  };

export const deleteCost =
  ({ userId, costId }, countReloadCosts = null) =>
  async (dispatch) => {
    try {
      dispatch(setIsCostDeleting(true));
      const data = await costsApi.deleteCost({ userId, costId });
      if (data.error === 0) {
        if (countReloadCosts) {
          dispatch(fetchCosts(null, null, null, countReloadCosts));
        } else {
          dispatch(deleteCostAccess({ userId, costId }));
        }
      } else {
        if (data.isWrongToken) {
          dispatch(logout());
          dispatch(setError("Ваша сессия истекла"));
        }
        dispatch(setError(data.message));
      }
      dispatch(setIsCostDeleting(false));
    } catch (e) {
      dispatch(
        setError("Произошла ошибка при удалении расхода, попробуйте позже")
      );
    }
  };

export const addCategory =
  ({ name, iconId }) =>
  async (dispatch) => {
    try {
      dispatch(setIsCategoriesLoading(true));
      const data = await costsApi.addCategory({ name, iconId });
      if (data.error === 0) {
        dispatch(fetchCategories());
        dispatch(setMessage("Категория успешно добавлена"));
      } else {
        if (data.isWrongToken) {
          dispatch(logout());
          dispatch(setError("Ваша сессия истекла"));
        }
        dispatch(setError(data.message));
      }
    } catch (e) {
      dispatch(
        setError("Произошла ошибка при добавлении категории, попробуйте позже")
      );
    }
  };

export const deleteCategory =
  (id, countReloadCosts = null) =>
  async (dispatch) => {
    try {
      dispatch(setIsCategoryEditing(true));
      const data = await costsApi.deleteCategory({ id });
      if (data.error === 0) {
        dispatch(deleteCategoryAccess({ id }));
        dispatch(fetchCosts(null, null, null, countReloadCosts));
        dispatch(setMessage("Категория успешно удалена"));
      } else {
        if (data.isWrongToken) {
          dispatch(logout());
          dispatch(setError("Ваша сессия истекла"));
        }
        dispatch(setError(data.message));
      }
      dispatch(setIsCategoryEditing(false));
    } catch (e) {
      dispatch(
        setError("Произошла ошибка при удалении категории, попробуйте позже")
      );
    }
  };

export const editCategory =
  ({ id, name, iconId, iconSrc }, countReloadCosts = null) =>
  async (dispatch) => {
    try {
      dispatch(setIsCategoryEditing(true));
      const data = await costsApi.editCategory({ id, name, iconId });
      if (data.error === 0) {
        dispatch(editCategoryAccess({ id, name, iconId, iconSrc }));
        dispatch(fetchCosts(null, null, null, countReloadCosts));
        dispatch(setMessage("Категория успешно изменена"));
      } else {
        if (data.isWrongToken) {
          dispatch(logout());
          dispatch(setError("Ваша сессия истекла"));
        }
        dispatch(setError(data.message));
      }
      dispatch(setIsCategoryEditing(false));
    } catch (e) {
      dispatch(
        setError("Произошла ошибка при изменении категории, попробуйте позже")
      );
    }
  };
