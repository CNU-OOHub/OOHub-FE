import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";

const Img = styled.img`
  width: 6rem;
`;

const Logo = () => {
  return <Img src={logo} alt="oohub logo" />;
};

export default Logo;
