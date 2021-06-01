import classNames from "classnames";
import React from "react";
import { Category, CategoryLoading } from "..";
import s from "./Categories.module.scss";

const Categories = ({
  generalCategories,
  addCategories,
  onClickCategory,
  onDblClickCategory,
  isLoading,
  withAdd,
  onClickAdd,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={s.categoriesWrapper}>
        {new Array(8).fill(0).map((_, i) => {
          return <CategoryLoading key={`_${i}`} />;
        })}
      </div>
    );
  }

  return (
    <div className={classNames(s.categoriesWrapper, className)}>
      {generalCategories &&
        generalCategories.map((c, i) => {
          return (
            <Category
              onDblClick={onDblClickCategory}
              onClick={onClickCategory}
              isGeneral={c.isGeneral}
              key={`${c.name}_${i}`}
              name={c.name}
              id={c.id}
              icon={c.icon}
            />
          );
        })}
      {addCategories &&
        addCategories.map((c, i) => {
          return (
            <Category
              onDblClick={onDblClickCategory}
              onClick={onClickCategory}
              isGeneral={c.isGeneral}
              key={`${c.name}_${i}`}
              id={c.id}
              name={c.name}
              icon={c.icon}
            />
          );
        })}
      {withAdd && (
        <div
          onClick={onClickAdd}
          className={classNames(s.addBtn, { [s.light]: true })}
        >
          <SvgAddCategory />
        </div>
      )}
    </div>
  );
};

const SvgAddCategory = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="30"
      height="30"
    >
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
    </svg>
  );
};

export default Categories;
