import classNames from "classnames";
import React from "react";

import s from "./TextField.module.scss";

export default function TextField({
  type,
  value,
  name,
  label,
  error,
  placeholder,
  className,
  inputRef,
  defaultValue,
}) {
  return (
    <div
      className={classNames(s.textFieldBlock, className, {
        [s.light]: true,
      })}
    >
      {label && <label>{label}</label>}
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        className={classNames(s.textField, {
          [s.light]: true,
          [s.error]: error && true,
        })}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
      />
      {error && (
        <div
          className={classNames(s.errorMsg, { [s.withLabel]: label && true })}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}
