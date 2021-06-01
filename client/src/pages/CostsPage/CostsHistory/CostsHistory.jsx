import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteCost, fetchCosts } from "../../../redux/actions/costs";

import {
  AcceptButton,
  CostsListWithDate,
  DropDown,
  DropItem,
  Modal,
  SelectPageSize,
  SelectRange,
} from "../../../components/";

import s from "./CostsHistory.module.scss";
import { fetchUsers } from "../../../redux/actions/users";

const PAGE_SIZES = [40, 60, 80, 4];

function getRangeString(from, to) {
  if (from === null && to === null) {
    return "За всё время";
  } else if (from === null) {
    return "до " + new Date(to).toLocaleDateString();
  } else if (to === null) {
    return "после " + new Date(from).toLocaleDateString();
  } else {
    return (
      new Date(from).toLocaleDateString() +
      "-" +
      new Date(to).toLocaleDateString()
    );
  }
}

const CostsHistory = () => {
  const dispatch = useDispatch();
  const { costs, isCostsLoading, isCostDeleting } = useSelector(
    ({ costs }) => costs
  );

  const { users } = useSelector(({ users }) => users);

  const [selectedUser, setSelectedUser] = useState("all");
  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(PAGE_SIZES[0]);

  const [isChoosingRange, setIsChoosingRange] = useState(false);

  const scrollToTop = useRef({});

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCosts(null, null, null, currentPageSize, currentPage));
    if (!isCostsLoading) {
      scrollToTop.current.scrollIntoView();
    }
  }, []);

  const selectRangeHandler = (from = null, to = null) => {
    let userId = selectedUser === "all" ? null : selectedUser;
    setSelectedRange({ from, to });
    setCurrentPage(1);
    dispatch(fetchCosts(from, to, userId, currentPageSize, 1));
  };

  const selectUserHandler = (userId) => {
    setSelectedUser(userId);
    let userIdToFetch = userId === "all" ? null : userId;
    setCurrentPage(1);
    dispatch(
      fetchCosts(
        selectedRange.from,
        selectedRange.to,
        userIdToFetch,
        currentPageSize,
        1
      )
    );
  };

  const onDeleteCost = async (cost) => {
    dispatch(deleteCost({ userId: cost.userId, costId: cost.costId }));
  };

  const uploadCosts = () => {
    let userId = selectedUser === "all" ? null : selectedUser;
    setCurrentPage(currentPage + 1);

    dispatch(
      fetchCosts(
        selectedRange.from,
        selectedRange.to,
        userId,
        currentPageSize,
        currentPage + 1,
        true
      )
    );
  };

  const changePageSizeHandler = (pageSize) => {
    let userId = selectedUser === "all" ? null : selectedUser;
    setCurrentPage(1);
    setCurrentPageSize(pageSize);
    dispatch(
      fetchCosts(selectedRange.from, selectedRange.to, userId, pageSize, 1)
    );
  };

  return (
    <div className={s.costsHistoryWrapper}>
      <Modal isOpen={isChoosingRange} setIsOpen={setIsChoosingRange}>
        <SelectRange
          initStart={selectedRange.from}
          initEnd={selectedRange.to}
          onClose={() => setIsChoosingRange(false)}
          onAccept={selectRangeHandler}
        />
      </Modal>
      <div ref={scrollToTop}></div>
      <div className={s.header}>
        <AcceptButton
          text={getRangeString(selectedRange.from, selectedRange.to)}
          onClick={() => setIsChoosingRange(true)}
        />

        <DropDown
          onSelect={selectUserHandler}
          showArrow
          showActiveItem
          activeDropDownItem={"Все"}
        >
          <DropItem label={"Все"} value={"all"} />
          {users &&
            users.map((u, i) => {
              return (
                <DropItem label={u.name} value={u._id} key={`${u._id}_${i}`} />
              );
            })}
        </DropDown>
      </div>
      <div className={s.costsAreaWrapper}>
        <CostsListWithDate
          large
          isCostsLoading={isCostsLoading}
          costs={costs}
          isCostDeleting={isCostDeleting}
          onDeleteCost={onDeleteCost}
          selectedUser={selectedUser}
        />
        {!isCostsLoading && (
          <div className={s.paginationArea}>
            <SelectPageSize
              pageSizes={PAGE_SIZES}
              activeValue={currentPageSize}
              onChange={changePageSizeHandler}
            />
            <AcceptButton
              onClick={uploadCosts}
              text={costs.hasNext ? "Смотреть ещё" : "Расходов больше нет"}
              disabled={!costs.hasNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CostsHistory;
