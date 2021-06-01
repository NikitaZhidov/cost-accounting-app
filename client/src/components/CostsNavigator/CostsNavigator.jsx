import React from "react";
import { NavLink } from "react-router-dom";

import s from "./CostsNavigator.module.scss";

const CostsNavigator = ({ links }) => {
  return (
    <div className={s.costsNavigatorWrapper}>
      {links?.map?.((link, i) => {
        return (
          <NavLink
            to={link.path}
            exact
            key={`${link.name}_${i}`}
            className={s.costsNavLink}
            activeClassName={s.activeNavLink}
          >
            <span>{link.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default CostsNavigator;
