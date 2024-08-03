import React from "react";
import Select from "react-select";
const CustomSelect = ({
  placeholder = "",
  options = "",
  defaultValue = "",
  value = "",
  onChange = "",
  color = "white",
}) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "none",
          outline: "none",
          backgroundColor: color === "white" ? "#fff" : "#f1f1f1",
          color: "#363636",
          fontSize: "14px",
          borderRadius: "4px",
          padding: "2px",
          width: "300px",
        }),
      }}
    />
  );
};

export default CustomSelect;
