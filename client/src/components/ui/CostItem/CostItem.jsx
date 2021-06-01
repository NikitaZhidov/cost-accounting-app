import classNames from "classnames";
import React from "react";
import config from "../../../config/config";
import s from "./CostItem.module.scss";

const CostItem = ({
  categoryName,
  categoryIcon,
  onClick,
  className,
  sum,
  comment,
  date,
  userId,
  costId,
  userName,
  bigCost,
}) => {
  const classes = classNames(className, s.costItem, { [s.light]: true });

  const onClickHandler = () => {
    if (onClick)
      onClick({
        date,
        userId,
        userName,
        comment,
        sum,
        categoryName,
        categoryIcon,
        costId,
      });
  };

  return (
    <div className={classes} onClick={onClickHandler}>
      <div className={s.costMain}>
        <img
          className={s.categoryIcon}
          src={config.baseURL + categoryIcon}
          alt={categoryName}
        />
        <div className={s.costInfo}>
          <h4 className={classNames(s.categoryName, { [s.light]: true })}>
            {categoryName}
          </h4>
          <h5 className={classNames(s.comment, { [s.light]: true })}>
            {comment}
          </h5>
        </div>
      </div>
      <div className={classNames(s.sum, { [s.light]: true, [s.big]: bigCost })}>
        {sum}₽
      </div>
    </div>
  );
};

export default CostItem;
