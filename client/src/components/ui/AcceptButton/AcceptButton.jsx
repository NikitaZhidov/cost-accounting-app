import classNames from "classnames";
import React from "react";

import s from "./AcceptButton.module.scss";

export default function AcceptButton({
  onClick,
  text,
  inputRef,
  className,
  disabled,
  cancelStyle,
  type,
}) {
  const classes = classNames(s.submitBtn, className, {
    [s.light]: true,
    [s.cancelStyle]: cancelStyle,
    [s.disabled]: disabled,
  });

  return (
    <>
      <button
        type={type}
        ref={inputRef}
        onClick={onClick}
        className={classes}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}
