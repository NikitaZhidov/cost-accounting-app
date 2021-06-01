import classNames from "classnames";
import React, { useEffect, useState } from "react";

import s from "./TabBar.module.scss";
import TabBarNav from "./TabBarNav/TabBarNav";

export default function TabBar({
  children,
  className,
  activeTabItem,
  onSetActiveTabItem,
}) {
  const [activeTab, setActiveTab] = useState(activeTabItem);

  const getChildrenLabels = (children) => {
    return children.map(({ props }) => props.label);
  };

  useEffect(() => {
    if (!activeTabItem) {
      const activeTab = getChildrenLabels(children)[0];
      setActiveTab(activeTab);
    }
  }, [children]);

  const renderTabs = () => {
    return getChildrenLabels(children).map((navLabel) => {
      return (
        <TabBarNav
          key={navLabel}
          navLabel={navLabel}
          active={activeTab === navLabel}
          onChangeActiveTab={() => {
            if (onSetActiveTabItem) {
              onSetActiveTabItem(navLabel);
            }
            setActiveTab(navLabel);
          }}
        />
      );
    });
  };

  const classes = classNames(s.tabBar, className);

  return (
    <div className={classes}>
      <div className={s.tabBarNav}>{renderTabs()}</div>
      <div className={s.tabContainer}>
        {children.map((child, i) =>
          React.cloneElement(child, {
            activeTab,
            key: child.props.label + "_" + i,
          })
        )}
      </div>
    </div>
  );
}
