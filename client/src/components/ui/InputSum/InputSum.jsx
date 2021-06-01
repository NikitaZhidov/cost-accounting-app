import classNames from "classnames";
import React from "react";

import s from "./InputSum.module.scss";

const valutes = {
  rub: "₽",
};

export default function InputSum({
  type,
  value,
  name,
  error,
  placeholder,
  className,
  inputRef,
  valute,
  step,
  min,
}) {
  return (
    <div
      className={classNames(s.inputSumBlock, className, {
        [s.light]: true,
      })}
    >
      <input
        ref={inputRef}
        className={classNames(s.inputField, {
          [s.light]: true,
          [s.error]: error && true,
        })}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        step={step}
        min={min}
      />
      {valute && valutes[valute]}
      {error && <div className={s.errorMsg}>{error.message}</div>}
    </div>
  );
}
