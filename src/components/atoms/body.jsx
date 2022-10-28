import React from "react";
import styled from "styled-components";

const BodyStyle = styled.div`
  height: ${(props) => `${props.height}vh`};
  background-color: ${(props) => props.backgroundColor};
`;

const Body = ({
  children,
  height = 92,
  backgroundColor = "white",
  onClick,
}) => {
  return (
    <BodyStyle
      height={height}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {children}
    </BodyStyle>
  );
};

export default Body;
