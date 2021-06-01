import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NavRoute.module.scss";

function NavRoute({ linkName, to, icon, onClick }) {
  return (
    <NavLink
      onClick={onClick}
      className={classNames(s.navLink, { [s.light]: true })}
      to={to}
      activeStyle={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
    >
      <img src={icon} alt={"..."} />
      <h4>{linkName}</h4>
    </NavLink>
  );
}

export default NavRoute;
