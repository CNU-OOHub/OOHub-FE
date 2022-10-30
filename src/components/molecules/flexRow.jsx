import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  flex-direction: row;
  margin-top: ${(props) => (props.needMargin ? "2rem" : 0)};
  margin-left: ${(props) => (props.needMargin ? "5%" : 0)};
  margin-right: ${(props) => (props.needMargin ? "5%" : 0)};
  flex-grow: ${(props) => props.flexGrow};
`;
const FlexRow = ({
  children,
  needMargin = false,
  justifyContent = "space-between",
  flexGrow = 0,
}) => {
  return (
    <Container
      needMargin={needMargin}
      justifyContent={justifyContent}
      flexGrow={flexGrow}
    >
      {children}
    </Container>
  );
};

export default FlexRow;
