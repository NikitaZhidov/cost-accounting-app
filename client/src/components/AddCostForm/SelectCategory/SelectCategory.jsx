import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Categories, Category, CategoryLoading, Modal } from "../..";
import s from "./SelectCategory.module.scss";

const SelectCategory = ({
  isLoading,
  inputRef,
  generalCategories,
  addCategories,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [primaryCategories, setPrimaryCategories] = useState(null);
  const [selectedCateogory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const primaryCategoriesInit = generalCategories
      .concat(addCategories)
      .slice(0, 3);

    setPrimaryCategories(primaryCategoriesInit);

    if (primaryCategoriesInit[0]) {
      setSelectedCategory(primaryCategoriesInit[0]);
    }
  }, [addCategories, generalCategories]);

  if (isLoading) {
    return (
      <div className={s.selectCategoryWrapper}>
        {new Array(3).fill(0).map((_, i) => {
          return <CategoryLoading key={`_${i}`} />;
        })}
      </div>
    );
  }

  const onClickCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickModalCategory = (category) => {
    setSelectedCategory(category);

    setPrimaryCategories(
      primaryCategories.map((c, i) => {
        if (i === 0) return category;
        if (c.id === category.id) return primaryCategories[0];
        return c;
      })
    );

    setIsOpenModal(false);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <div className={s.selectCategoryContainer}>
          <Categories
            onClickCategory={onClickModalCategory}
            addCategories={addCategories}
            generalCategories={generalCategories}
          />
        </div>
      </Modal>
      <div className={s.selectCategoryWrapper}>
        <input
          type={"hidden"}
          name={"category"}
          value={JSON.stringify(selectedCateogory) || {}}
          ref={inputRef}
        />
        {primaryCategories &&
          primaryCategories.map((c, i) => {
            return (
              <Category
                id={c.id}
                active={selectedCateogory && selectedCateogory.id === c.id}
                key={`${c.name}_${i}`}
                name={c.name}
                className={s.categoryItem}
                icon={c.icon}
                onClick={onClickCategory}
                isGeneral={c.isGeneral}
              />
            );
          })}
        <div
          className={classNames(s.selectCategoryBtn, {
            [s.light]: true,
          })}
          onClick={() => setIsOpenModal(true)}
        >
          <SvgSelectCategory />
        </div>
      </div>
    </>
  );
};

const SvgSelectCategory = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="30"
      height="30"
    >
      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
    </svg>
  );
};

export default SelectCategory;
