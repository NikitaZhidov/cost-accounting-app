import classNames from "classnames";
import React, { useState } from "react";
import { AddCategoryForm, Categories, CategoryInfo, Modal } from "..";
import s from "./CategoriesInfo.module.scss";

const CategoriesInfo = ({
  onDeleteCategory,
  onEditCategory,
  isCategoryEditing,
  isCategoriesLoading,
  addCategories,
  generalCategories,
  icons,
  onAddCategory,
}) => {
  const [categoryInfoIsOpen, setCategoryInfoIsOpen] = useState(false);
  const [currentCategoryInfo, setCurrentCategoryInfo] = useState(null);

  const [addCategoryFormIsOpen, setAddCategoryFormIsOpen] = useState(false);

  const onClickCategoryHandler = (category) => {
    setCurrentCategoryInfo(category);
    setCategoryInfoIsOpen(true);
  };

  const onDeleteCategoryHandler = (id) => {
    setCurrentCategoryInfo(null);
    onDeleteCategory(id);
    setCategoryInfoIsOpen(false);
  };

  const onEditCategoryHandler = ({ name, iconId, id, iconSrc }) => {
    onEditCategory({ id, name, iconId, iconSrc });
    setCurrentCategoryInfo({ id, name, isGeneral: false, icon: iconSrc });
  };

  return (
    <>
      <Modal
        isOpen={categoryInfoIsOpen || isCategoryEditing}
        setIsOpen={setCategoryInfoIsOpen}
      >
        <CategoryInfo
          isCategoryEditing={isCategoryEditing}
          category={currentCategoryInfo}
          onDelete={onDeleteCategoryHandler}
          isConfirmation={!categoryInfoIsOpen}
          icons={icons}
          onEdit={onEditCategoryHandler}
        />
      </Modal>

      <Modal
        isOpen={addCategoryFormIsOpen}
        setIsOpen={setAddCategoryFormIsOpen}
      >
        <AddCategoryForm
          onSubmit={onAddCategory}
          onCancel={() => setAddCategoryFormIsOpen(false)}
          icons={icons}
        />
      </Modal>
      <h3
        className={classNames(s.blockTitle, s.categoriesTitle, {
          [s.light]: true,
        })}
      >
        Категории расходов
      </h3>
      <Categories
        className={s.categories}
        addCategories={addCategories}
        generalCategories={generalCategories}
        isLoading={isCategoriesLoading}
        onClickCategory={onClickCategoryHandler}
        withAdd
        onClickAdd={() => setAddCategoryFormIsOpen(true)}
      />
    </>
  );
};

export default CategoriesInfo;
