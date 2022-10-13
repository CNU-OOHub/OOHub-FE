import React from "react";

const Input = ({
  type = "text",
  inputType,
  placeholder,
  height = 3.5,
  onChange,
}) => {
  switch (type) {
    case "text":
      return (
        <input
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          style={{ height: `${height}rem`, paddingLeft: "5px" }}
        />
      );
    default:
      return <input type={type} />;
  }
};

export default Input;
