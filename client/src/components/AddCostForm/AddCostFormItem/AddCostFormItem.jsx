import classNames from "classnames";
import React from "react";
import s from "./AddCostFormItem.module.scss";

const AddCostFormItem = ({
  children,
  label,
  classNameWrapper,
  classNameChildrenWrapper,
  error,
}) => {
  const labelClasses = classNames(s.label, { [s.light]: true });

  const classes = classNames(s.wrapper, classNameWrapper);

  return (
    <div className={classes}>
      {label && <h3 className={labelClasses}>{label}</h3>}
      {error && <div className={s.errorMsg}>{error.message}</div>}
      <div className={classNames(s.childrenWrapper, classNameChildrenWrapper)}>
        {children}
      </div>
    </div>
  );
};

export default AddCostFormItem;
