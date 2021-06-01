import classNames from "classnames";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  AcceptButton,
  LastCosts,
  AddCostForm,
  CategoriesInfo,
} from "../../../components";

import {
  addCategory,
  addCost,
  deleteCategory,
  deleteCost,
  editCategory,
  fetchCategories,
  fetchCosts,
} from "../../../redux/actions/costs";

import { fetchIcons } from "../../../redux/actions/icons";
import { fetchUsers } from "../../../redux/actions/users";

import s from "./CostsMain.module.scss";

const COUNT_LAST_COSTS = 4;

function CostsMain() {
  const { generalCategories, addCategories } = useSelector(
    ({ costs }) => costs.categories
  );

  const { isUsersLoading, users } = useSelector(({ users }) => users);

  const {
    isCategoriesLoading,
    isCostsLoading,
    isCategoryEditing,
    isCostDeleting,
  } = useSelector((state) => state.costs);

  const { costs } = useSelector(({ costs }) => costs);

  const { icons } = useSelector(({ icons }) => icons);

  const dispatch = useDispatch();

  const getCosts = () => {
    dispatch(fetchCosts(null, null, null, COUNT_LAST_COSTS));
  };

  const getCategories = () => {
    dispatch(fetchCategories());
  };

  const getIcons = () => {
    dispatch(fetchIcons());
  };

  const getUsers = () => {
    dispatch(fetchUsers());
  };

  useEffect(() => {
    getCosts();
    getCategories();
    getIcons();
    getUsers();
  }, []);

  const addCategoryHandler = (formData) => {
    dispatch(addCategory({ name: formData.name, iconId: formData.id }));
  };

  const addCostHandler = (formData) => {
    formData.costsId.forEach((u) => {
      dispatch(addCost({ ...formData, costsId: u.value }, COUNT_LAST_COSTS));
    });
  };

  const onDeleteCategory = (id) => {
    dispatch(deleteCategory(id, COUNT_LAST_COSTS));
  };

  const onEditCategory = ({ name, iconId, id, iconSrc }) => {
    dispatch(editCategory({ id, name, iconId, iconSrc }, COUNT_LAST_COSTS));
  };

  const onDeleteCost = (cost) => {
    dispatch(
      deleteCost({ userId: cost.userId, costId: cost.costId }, COUNT_LAST_COSTS)
    );
  };

  const onChangeTargetUser = (user) => {
    if (user === "all") {
      dispatch(fetchCosts(null, null, null, COUNT_LAST_COSTS));
    } else {
      dispatch(fetchCosts(null, null, user, COUNT_LAST_COSTS));
    }
  };

  return (
    <div className={s.costsPage}>
      <div className={classNames(s.addCostSection, { [s.light]: true })}>
        <AddCostForm
          isCategoriesLoading={isCategoriesLoading}
          isCostsLoading={isCostsLoading}
          isUsersLoading={isUsersLoading}
          addCategories={addCategories}
          generalCategories={generalCategories}
          users={users}
          onSubmitForm={addCostHandler}
        />
      </div>

      <section className={s.costsSection}>
        <div className={s.categoriesContainer}>
          <CategoriesInfo
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            isCategoryEditing={isCategoryEditing}
            isCategoriesLoading={isCategoriesLoading}
            addCategories={addCategories}
            generalCategories={generalCategories}
            icons={icons}
            onAddCategory={addCategoryHandler}
          />
        </div>
        <div className={s.lastCostsContainer}>
          <LastCosts
            onDeleteCost={onDeleteCost}
            isCostDeleting={isCostDeleting}
            isCostsLoading={isCostsLoading}
            users={users}
            costs={costs}
            onChangeTargetUser={onChangeTargetUser}
            title={"Последние расходы"}
          />
          {!isCostsLoading && (
            <NavLink to={"/costs/history"}>
              <AcceptButton text={"Посмотреть всю историю"} />
            </NavLink>
          )}
        </div>
      </section>
    </div>
  );
}

export default CostsMain;
