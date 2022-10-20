import React from "react";
import styled from "styled-components";

const BodyStyle = styled.div`
  height: ${(props) => `${props.height}vh`};
`;

const Body = ({ children, height = 92 }) => {
  return <BodyStyle height={height}>{children}</BodyStyle>;
};

export default Body;
