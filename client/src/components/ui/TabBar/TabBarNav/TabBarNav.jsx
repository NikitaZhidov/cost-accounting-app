import classNames from "classnames";
import React from "react";

import s from "./TabBarNav.module.scss";

export default function TabBarNav({ navLabel, active, onChangeActiveTab }) {
  const classes = classNames(s.navItem, {
    [s.active]: active,
    [s.light]: true,
  });
  return (
    <button className={classes} onClick={() => onChangeActiveTab(navLabel)}>
      {navLabel}
    </button>
  );
}
