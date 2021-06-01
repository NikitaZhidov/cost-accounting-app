import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  CostInfo,
  CostItem,
  CostItemLargeLoading,
  CostItemLoading,
  Modal,
} from "..";
import { getCorrectDateString } from "../../utils/dateUtils";
import { groupBy } from "../../utils/generalUrils";
import s from "./CostsListWithDate.module.scss";

const CostsListWithDate = ({
  costs,
  onDeleteCost,
  isCostDeleting,
  isCostsLoading,
  selectedUser,
  large,
}) => {
  const [costInfoIsOpen, setCostInfoIsOpen] = useState(false);
  const [currentCostInfo, setCurrentCostInfo] = useState(null);

  const [sortedCosts, setSortedCosts] = useState([]);

  useEffect(() => {
    let allCosts = [];

    costs.users.forEach((u) => {
      if (selectedUser === "all" || u._id === selectedUser) {
        const userCosts = u.costs.costs.map((c) => ({
          ...c,
          userId: u._id,
          userName: u.name,
        }));
        allCosts = [...allCosts, ...userCosts];
      }
    });

    allCosts.sort((c1, c2) => new Date(c2.date) - new Date(c1.date));
    const sortedCostsTmp = groupBy(allCosts, (c) =>
      getCorrectDateString(c.date)
    );

    setSortedCosts(sortedCostsTmp);
  }, [costs]);

  const onClickCostHandler = (cost) => {
    setCurrentCostInfo(cost);
    setCostInfoIsOpen(true);
  };

  const onDeleteCostHandler = (cost) => {
    setCurrentCostInfo(null);
    onDeleteCost(cost);
    setCostInfoIsOpen(false);
  };

  if (isCostsLoading) {
    return (
      <div className={s.costsHistoryWrapper}>
        <div className={classNames(s.dayContainer, { [s.light]: true })}>
          <h5 className={s.dayName}> </h5>
          {new Array(5).fill(0).map((_, i) => {
            if (large) return <CostItemLargeLoading key={`_${i}`} />;
            return <CostItemLoading key={`_${i}`} />;
          })}
        </div>
        <div className={classNames(s.dayContainer, { [s.light]: true })}>
          <h5 className={s.dayName}> </h5>
          {new Array(5).fill(0).map((_, i) => {
            if (large) return <CostItemLargeLoading key={`_${i}`} />;
            return <CostItemLoading key={`_${i}`} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={costInfoIsOpen || isCostDeleting}
        setIsOpen={setCostInfoIsOpen}
      >
        <CostInfo
          {...currentCostInfo}
          isCostDeleting={isCostDeleting}
          onDelete={onDeleteCostHandler}
        />
      </Modal>
      {sortedCosts &&
        Array.from(sortedCosts).map(([key, value], i) => {
          let retJSX = [
            <h5 className={s.dayName} key={`${key}_${i}`}>
              {key}
            </h5>,
          ];
          value.map((c, j) => {
            const category = c.AddCategory || c.GeneralCategory;
            retJSX.push(
              <CostItem
                className={s.costItem}
                userId={c.userId}
                costId={c._id}
                userName={c.userName}
                onClick={onClickCostHandler}
                bigCost={large}
                date={c.date}
                key={`${c.comment}_${i}_${j}`}
                sum={c.sum}
                comment={c.comment}
                categoryIcon={category.icon.src}
                categoryName={category.name}
              />
            );
          });
          return (
            <div
              key={`${key}_${i}`}
              className={classNames(s.dayContainer, { [s.light]: true })}
            >
              {retJSX}
            </div>
          );
        })}
    </>
  );
};

export default CostsListWithDate;
