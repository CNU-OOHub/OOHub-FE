import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}%`};
  padding-top: ${(props) => `${props.verticalPadding}rem`};
  padding-bottom: ${(props) => `${props.verticalPadding}rem`};
  padding-left: ${(props) => `${props.horizontalPadding}rem`};
  padding-right: ${(props) => `${props.horizontalPadding}rem`};
  align-content: center;
  text-align: center;
  vertical-align: middle;
`;

const FlexColumn = ({
  children,
  justifyContent = "space-between",
  verticalPadding = 0,
  horizontalPadding = 0,
  height = 100,
  width = 25,
}) => {
  return (
    <Container
      justifyContent={justifyContent}
      horizontalPadding={horizontalPadding}
      verticalPadding={verticalPadding}
      height={height}
      width={width}
    >
      {children}
    </Container>
  );
};

export default FlexColumn;
