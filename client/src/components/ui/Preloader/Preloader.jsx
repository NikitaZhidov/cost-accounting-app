import classNames from "classnames";
import React from "react";
import s from "./Preloader.module.scss";

const Preloader = ({ small, medium, big }) => {
  const classes = classNames(s.loader, {
    [s.light]: true,
    [s.small]: small,
    [s.medium]: medium,
    [s.big]: big,
  });
  return (
    <div className={s.wrapper}>
      <div className={classes}></div>
    </div>
  );
};

export default Preloader;
