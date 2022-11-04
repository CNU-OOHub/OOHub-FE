import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const DropDownBox = styled.select`
  width: ${(props) => `${props.width}%`};
  height: ${(props) => `${props.height}rem`};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-size: ${(props) => `${props.fontSize}rem`};
`;

const DropDown = ({
  options,
  onChange,
  placeholder,
  height = 3,
  width = 100,
  backgroundColor = "white",
  color = "black",
  fontSize = 1.1,
  disabled = false,
  selectedValue,
}) => {
  return (
    <DropDownBox
      onChange={onChange}
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
      disabled={disabled}
      value={selectedValue}
    >
      <option value={placeholder} hidden color={color}>
        {placeholder}
      </option>

      {options.map((value) => {
        return (
          <option color={color} key={value}>
            {value}
          </option>
        );
      })}
    </DropDownBox>
  );
};

export default DropDown;
