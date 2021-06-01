import classNames from "classnames";
import React from "react";
import s from "./TabBarItem.module.scss";

export default function TabBarItem({ children, label, activeTab }) {
  const classes = classNames(s.tabBarItem, { [s.active]: activeTab === label });
  return <div className={classes}>{children}</div>;
}
