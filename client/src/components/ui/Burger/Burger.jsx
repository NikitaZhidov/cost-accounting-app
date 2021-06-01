import React from "react";

import classNames from "classnames";
import s from "./Burger.module.scss";

const Burger = ({ className, onClick }) => {
  return (
    <div
      className={classNames(s.burgerWrapper, { [s.light]: true })}
      onClick={onClick}
    >
      <span
        className={classNames(s.burger, className, { [s.light]: true })}
      ></span>
    </div>
  );
};

export default Burger;
