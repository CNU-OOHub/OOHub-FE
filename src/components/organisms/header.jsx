import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";

const Head = styled.div`
  width: 100%;
  height: 8vh;
  background-color: ${theme.primaryColor};
`;

const Header = () => {
  const navigate = useNavigate();
  return <Head />;
};

export default Header;
