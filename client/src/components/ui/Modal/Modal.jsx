import classNames from "classnames";
import React from "react";
import s from "./Modal.module.scss";

const Modal = ({ isOpen, setIsOpen, children }) => {
  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(s.modal, { [s.active]: isOpen })}
      onClick={setIsOpen && closeHandler}
    >
      <div
        className={classNames(s.modalContent, {
          [s.light]: true,
          [s.active]: isOpen,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
