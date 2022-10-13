import React from "react";
import styled, { css } from "styled-components";
import theme from "../../styles/theme";

const CustomButton = styled.button`
  text-align: center;
  vertical-align: center;
  width: ${(props) => `${props.width}%`};
  height: ${(props) => `${props.height}rem`};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => `${props.fontSize}rem`};
  font-weight: ${(props) => props.fontWeight};
  //border: ${(props) => props.border};
  ${(props) =>
    props.hoverEvent &&
    css`
      &:hover {
        box-shadow: 1px 1px 3px 4px lightgrey;
        transition: 0.4s;
      }
    `}
`;

const Button = ({
  children,
  onClick,
  width,
  height,
  bgColor = theme.primaryColor,
  color = "black",
  fontSize = 1,
  fontWeight = 700,
  border = "none",
  hoverEvent = false,
}) => {
  return (
    <CustomButton
      onClick={onClick}
      width={width}
      height={height}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      hoverEvent={hoverEvent}
      type="button"
    >
      {children}
    </CustomButton>
  );
};

export default Button;
