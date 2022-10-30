import React from "react";

const Input = ({
  type = "text",
  inputType,
  placeholder,
  height = 3.5,
  width,
  onChange,
  fontSize,
  backgroundColor = "white",
}) => {
  switch (type) {
    case "text":
      return (
        <input
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          style={{
            height: `${height}rem`,
            paddingLeft: "5px",
            width: `${width}%`,
            backgroundColor: backgroundColor,
            fontSize: fontSize,
          }}
        />
      );
    default:
      return <input type={type} />;
  }
};

export default Input;
