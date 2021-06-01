import classNames from "classnames";
import React, { useState } from "react";
import { CostsListWithDate, DropDown, DropItem } from "..";

import s from "./LastCosts.module.scss";

const LastCosts = ({
  title,
  costs,
  users,
  isCostsLoading,
  isCostDeleting,
  onDeleteCost,
  onChangeTargetUser,
}) => {
  const [selectedUser, setSelectedUser] = useState("all");

  const selectUserHandler = (value) => {
    setSelectedUser(value);
    onChangeTargetUser(value);
  };

  const onDeleteCostHandler = (cost) => {
    onDeleteCost(cost);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.lastCostsHeader}>
          <h3
            className={classNames(s.blockTitle, s.lastCostsTitle, {
              [s.light]: true,
            })}
          >
            {title}
          </h3>
          {users.length !== 0 && (
            <DropDown
              onSelect={selectUserHandler}
              showActiveItem
              showArrow
              activeDropDownItem={"Все"}
            >
              <DropItem label={"Все"} value={"all"} />
              {users &&
                users.map((u, i) => (
                  <DropItem
                    label={u.name}
                    value={u._id}
                    key={`${u.name}_${i}`}
                  />
                ))}
            </DropDown>
          )}
        </div>
        <div className={s.lastCostsContent}>
          <div className={s.lastCosts}>
            <CostsListWithDate
              isCostDeleting={isCostDeleting}
              isCostsLoading={isCostsLoading}
              onDeleteCost={onDeleteCostHandler}
              costs={costs}
              selectedUser={selectedUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LastCosts;
