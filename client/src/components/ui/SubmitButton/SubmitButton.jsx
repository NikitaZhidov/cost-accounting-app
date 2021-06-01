import classNames from "classnames";
import React from "react";

import s from "./SubmitButton.module.scss";

export default function SubmitButton({ type, onClick, text, inputRef }) {
  const classes = classNames(s.submitBtn, { [s.light]: true });

  return (
    <>
      <input
        type={"submit"}
        ref={inputRef}
        onClick={onClick}
        value={text}
        className={classes}
      />
    </>
  );
}
