import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import s from "./DropDown.module.scss";

const DropDown = ({
  children,
  onSelect,
  activeDropDownItem,
  showActiveItem,
  className,
  customLabel,
  showArrow,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(activeDropDownItem);

  const ddRef = useRef(null);

  let rightChildren = [].concat.apply([], children);
  if (!children.length) {
    rightChildren = [children];
  }

  const getChildrenLabels = (rightChildren) => {
    return rightChildren.map((child) => child.props.label);
  };

  const handleOutsideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(ddRef.current)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    if (!activeDropDownItem) {
      if (rightChildren.length > 0) {
        setActiveItem(getChildrenLabels(rightChildren)[0]);
      }
    }

    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, [activeDropDownItem, rightChildren]);

  const selectHandler = (label, value) => {
    setActiveItem(label);
    if (onSelect) {
      onSelect(value);
    }
    setIsOpen(false);
  };

  return (
    <div className={classNames(s.DropDownWrapper, className)} ref={ddRef}>
      <div className={s.openDropDown} onClick={() => setIsOpen(!isOpen)}>
        {showActiveItem && <div className={s.DropDownActive}>{activeItem}</div>}
        {customLabel && <div className={s.DropDownActive}>{customLabel}</div>}
        {showArrow && (
          <svg
            className={!isOpen ? s.rotated : ""}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        )}
      </div>
      <div className={classNames(s.DropDown, { [s.isOpen]: isOpen || false })}>
        {rightChildren.length > 0 &&
          rightChildren.map((child, i) => {
            return (
              <div
                className={classNames(s.DropDownItem)}
                onClick={() =>
                  selectHandler(child.props.label, child.props.value)
                }
                key={`${child.props.label}_${i}`}
              >
                {child.props.label}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default React.memo(DropDown);
