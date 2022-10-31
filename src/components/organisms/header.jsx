import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { adminPageState, loginState } from "../../atom";
import theme from "../../styles/theme";
import HomeHeader from "../molecules/homeHeader";
import GrayHeader from "../molecules/grayHeader";

const AuthHead = styled.div`
  width: 100%;
  height: 8vh;
  background-color: ${theme.primaryColor};
`;

const Header = () => {
  const login = useRecoilValue(loginState);
  const adminPage = useRecoilValue(adminPageState);
  return login ? (
    adminPage.visible ? (
      <GrayHeader />
    ) : (
      <HomeHeader />
    )
  ) : (
    <AuthHead />
  );
};

export default Header;
