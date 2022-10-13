import React from "react";
import styled from "styled-components";

const DropDownBox = styled.select`
  width: 100%;
  height: ${(props) => `${props.height}rem`};
`;

const DropDown = ({ options, onChange, placeholder, height = 3 }) => {
  return (
    <DropDownBox onChange={onChange} height={height}>
      <option value={placeholder} hidden color="grey">
        {placeholder}
      </option>

      {options.map((value) => {
        return (
          <option color="black" key={value}>
            {value}
          </option>
        );
      })}
    </DropDownBox>
  );
};

export default DropDown;
