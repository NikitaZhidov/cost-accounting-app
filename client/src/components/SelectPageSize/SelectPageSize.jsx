import classNames from "classnames";
import React from "react";
import s from "./SelectPageSize.module.scss";

const SelectPageSize = ({ pageSizes, activeValue, onChange }) => {
  const itemClassName = s.selectItem;
  const lightItemClassName = s.light;
  const activeItemClassName = s.active;

  const onChangePageSize = (pageSize) => {
    onChange(pageSize);
  };

  return (
    <div className={s.selectWrapper}>
      {pageSizes &&
        pageSizes.map((s, i) => {
          return (
            <div
              onClick={() => onChangePageSize(s)}
              className={classNames(itemClassName, {
                [lightItemClassName]: true,
                [activeItemClassName]: activeValue === s,
              })}
              key={`${s}_${i}`}
            >
              {s}
            </div>
          );
        })}
    </div>
  );
};

export default SelectPageSize;
