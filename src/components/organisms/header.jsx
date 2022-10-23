import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../atom";
import theme from "../../styles/theme";
import HomeHeader from "../molecules/homeHeader";

const AuthHead = styled.div`
  width: 100%;
  height: 8vh;
  background-color: ${theme.primaryColor};
`;

const Header = () => {
  const login = useRecoilValue(loginState);
  return login ? <HomeHeader /> : <AuthHead />;
};

export default Header;
