import React from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../atom";
import theme from "../../styles/theme";

const Head = styled.div`
  width: 100%;
  height: 8vh;
  background-color: ${theme.primaryColor};
`;

const Nav = () => {
  const isLogIn = useRecoilValue(loginState);
  return isLogIn ? <Head /> : <Head />;
};

export default Nav;
