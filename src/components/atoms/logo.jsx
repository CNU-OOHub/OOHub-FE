import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo_small.png";

const Img = styled.img`
  height: 6vh;
`;

const Logo = () => {
  return <Img src={logo} alt="oohub logo" />;
};

export default Logo;
