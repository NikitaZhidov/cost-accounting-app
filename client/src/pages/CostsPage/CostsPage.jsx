import classNames from "classnames";
import React from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import { AcceptButton, CostsNavigator } from "../../components";
import CostsHistory from "./CostsHistory/CostsHistory";

import CostsMain from "./CostsMain/CostsMain";

import s from "./CostsPage.module.scss";

const costsNavigation = [
  { path: "/costs", name: "Главная", component: CostsMain },
  { path: "/costs/history", name: "История", component: CostsHistory },
];

function CostsPage() {
  return (
    <div>
      <CostsNavigator links={costsNavigation} />
      {costsNavigation.map((nav, i) => {
        return (
          <Route
            key={`${nav.name}_${i}`}
            path={nav.path}
            component={nav.component}
            exact
          />
        );
      })}
    </div>
  );
}

export default CostsPage;
