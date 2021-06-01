import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { selectV } from "../../../utils/formValidation";
import s from "./SelectConsumers.module.scss";
import SelectPreloader from "./SelectPreloader/SelectPreloader";

const SelectConsumers = ({
  users,
  errors,
  isUsersLoading,
  inputRef,
  control,
}) => {
  const [primaryConsumers, setPrimaryConsumers] = useState(null);
  const [defaultConsumers, setDefaultConsumers] = useState(null);

  const selectUserCustomStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: errors.costsId ? "red" : base.borderColor,
      ["&:hover"]: {
        borderColor: errors.costsId ? "red" : base.borderColor,
      },
      zIndex: 0,
    }),
  };

  useEffect(() => {
    const initPrimaryConsumers = users.map((u) => ({
      value: u.costs,
      label: u.name,
    }));
    setPrimaryConsumers(initPrimaryConsumers);

    const defaultConsumers = users
      .map((u) => ({
        value: u.costs,
        label: u.name,
      }))
      ?.filter?.((_, i) => i == 0);

    setDefaultConsumers(defaultConsumers);
  }, [users]);

  return (
    <>
      {isUsersLoading && (
        <SelectPreloader
          styles={selectUserCustomStyles}
          className={s.selectConsumer}
          placeholder={"Выберите"}
        />
      )}
      {!isUsersLoading && (
        <Controller
          rules={selectV()}
          control={control}
          name={"costsId"}
          defaultValue={defaultConsumers}
          render={({ onChange }) => {
            return (
              <Select
                defaultValue={defaultConsumers}
                isDisabled={isUsersLoading}
                isLoading={isUsersLoading}
                styles={selectUserCustomStyles}
                menuPlacement={"auto"}
                options={primaryConsumers}
                className={classNames(s.selectConsumer)}
                ref={inputRef}
                isMulti
                placeholder={"Выберите..."}
                onChange={onChange}
              />
            );
          }}
        />
      )}
    </>
  );
};

export default SelectConsumers;
