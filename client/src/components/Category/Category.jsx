import classNames from "classnames";
import React from "react";
import config from "../../config/config";
import s from "./Category.module.scss";

const Category = ({
  id,
  icon,
  name,
  className,
  onClick,
  active,
  isGeneral,
  onDblClick,
}) => {
  const classes = classNames(s.Category, className, {
    [s.light]: true,
    [s.active]: active,
  });

  const onClickHandler = () => {
    onClick({ id, icon, name, isGeneral });
  };

  const onDblClickHandler = () => {
    onDblClick({ id, icon, name, isGeneral });
  };

  return (
    <div
      onClick={onClick && onClickHandler}
      onDoubleClick={onDblClick && onDblClickHandler}
      className={classes}
    >
      {!isGeneral && (
        <div className={classNames(s.marked, { [s.light]: true })}></div>
      )}
      <img className={s.icon} src={config.baseURL + icon} alt={name} />
      <div className={classNames(s.title, { [s.light]: true })}>{name}</div>
    </div>
  );
};

export default Category;
