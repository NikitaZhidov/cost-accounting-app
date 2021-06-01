import classNames from "classnames";
import React, { useEffect, useState } from "react";
import config from "../../config/config";
import { AcceptButton, Preloader } from "..";
import s from "./CostInfo.module.scss";

const CostInfo = ({
  date,
  categoryIcon,
  categoryName,
  comment,
  sum,
  userName,
  userId,
  costId,
  onDelete,
  isCostDeleting,
}) => {
  const [isCostDeletingLast, setIsCostDeletingLast] = useState(false);

  const onDeleteHandler = () => {
    if (onDelete) onDelete({ userId, costId });
  };

  useEffect(() => {
    setIsCostDeletingLast(isCostDeleting);
  }, [isCostDeleting]);

  if (isCostDeleting || isCostDeletingLast || !categoryName) {
    return <Preloader medium />;
  }

  return (
    <div className={s.costInfoWrapper}>
      <div className={classNames(s.categoryArea, { [s.light]: true })}>
        <img
          className={s.categoryIcon}
          src={config.baseURL + categoryIcon}
          alt={categoryName}
        />
        <h4 className={classNames(s.categoryName, { [s.light]: true })}>
          {categoryName}
        </h4>
      </div>
      <div className={s.costInfoArea}>
        <div className={classNames(s.costSum, { [s.light]: true })}>{sum}₽</div>
        <div className={classNames(s.costComment, { [s.light]: true })}>
          {comment}
        </div>
        <div className={classNames(s.costUserName, { [s.light]: true })}>
          <div>{userName}</div>
          <div>{new Date(date).toLocaleDateString()}</div>
        </div>
        <AcceptButton cancelStyle text={"Удалить"} onClick={onDeleteHandler} />
      </div>
    </div>
  );
};

export default CostInfo;
