import React from "react";
import styled from "styled-components";
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
  border: ${(props) => props.border};
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
      type="button"
    >
      {children}
    </CustomButton>
  );
};

export default Button;
