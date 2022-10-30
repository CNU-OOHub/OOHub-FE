import React from "react";
import styled, { css } from "styled-components";
import theme from "../../styles/theme";

const CustomButton = styled.button`
  padding: ${(props) => `${props.padding}rem`};
  margin-right: ${(props) => `${props.marginRight}rem`};
  text-align: center;
  vertical-align: center;
  width: ${(props) => `${props.width}%`};
  height: ${(props) => `${props.height}rem`};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => `${props.fontSize}rem`};
  font-weight: ${(props) => props.fontWeight};
  ${(props) =>
    props.hoverEvent &&
    css`
      &:hover {
        box-shadow: 1px 1px 3px 4px lightgrey;
        transition: 0.4s;
      }
    `}
  border-bottom: ${(props) => props.borderBottom};
`;

const Button = ({
  children,
  onClick,
  padding = 0,
  marginRight = 0,
  width,
  height,
  bgColor = theme.primaryColor,
  color = "black",
  fontSize = 1,
  fontWeight = 700,
  border = "none",
  hoverEvent = false,
  borderBottom,
}) => {
  return (
    <CustomButton
      onClick={onClick}
      padding={padding}
      marginRight={marginRight}
      width={width}
      height={height}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      hoverEvent={hoverEvent}
      borderBottom={borderBottom}
      type="button"
    >
      {children}
    </CustomButton>
  );
};

export default Button;
