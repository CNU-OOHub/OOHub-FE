import React from "react";

const Input = ({ type = "text", placeholder, height = 3.5, onChange }) => {
  switch (type) {
    case "text":
      return (
        <input
          placeholder={placeholder}
          onChange={onChange}
          style={{ height: `${height}rem` }}
        />
      );
    default:
      return <input type={type} />;
  }
};

export default Input;
