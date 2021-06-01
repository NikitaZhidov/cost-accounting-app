import classNames from "classnames";
import React from "react";
import { CostItem, CostItemLoading } from "../..";
import s from "./LastCostsItem.module.scss";

const LastCostsItem = ({
  array,
  dateString,
  className,
  isLoading,
  onClickCost,
}) => {
  const classes = classNames(className, s.wrapper);

  if (isLoading) {
    return (
      <div className={classes}>
        {new Array(3).fill(0).map((_, i) => {
          return <CostItemLoading key={`_${i}`} />;
        })}
      </div>
    );
  }

  return (
    <div className={classes}>
      {array && <h5 className={s.dayName}>{dateString}</h5>}
      {array &&
        array.map((c, i) => {
          const category = c.GeneralCategory || c.AddCategory;

          return (
            <CostItem
              costId={c._id}
              userId={c.userId}
              userName={c.userName}
              date={c.date}
              onClick={onClickCost}
              className={classNames(s.costItem, { [s.light]: true })}
              key={`${c.comment}_${i}`}
              categoryIcon={category.icon.src}
              categoryName={category.name}
              comment={c.comment}
              sum={c.sum}
            />
          );
        })}
    </div>
  );
};

export default LastCostsItem;
