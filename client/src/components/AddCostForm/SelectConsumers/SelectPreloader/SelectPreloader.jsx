import React from "react";
import Select from "react-select";

const SelectPreloader = ({ className, placeholder, styles }) => {
  return (
    <Select
      isDisabled={true}
      isLoading={true}
      styles={styles}
      className={className}
      placeholder={"Выберите..."}
    />
  );
};

export default SelectPreloader;
