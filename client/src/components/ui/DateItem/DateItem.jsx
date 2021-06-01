import classNames from "classnames";
import React from "react";
import { getCorrectDateString } from "../../../utils/dateUtils";
import s from "./DateItem.module.scss";

const DateItem = ({ date, className, activeDate, onClickDate }) => {
  const dateSettings = {
    month: "numeric",
    day: "numeric",
  };

  const onClickHandler = () => {
    onClickDate(date);
  };

  if (new Date(date).getFullYear() !== new Date().getFullYear()) {
    dateSettings.year = "numeric";
  }

  const classes = classNames(className, s.dateItem, {
    [s.light]: true,
    [s.active]: date.getTime() === activeDate.getTime(),
  });

  return (
    <div className={classes} onClick={onClickDate && onClickHandler}>
      <div className={classNames(s.date, { [s.light]: true })}>
        {date && date.toLocaleDateString(undefined, dateSettings)}
      </div>
      <div className={classNames(s.dateString, { [s.light]: true })}>
        {date && getCorrectDateString(date, true)}
      </div>
    </div>
  );
};

export default DateItem;
