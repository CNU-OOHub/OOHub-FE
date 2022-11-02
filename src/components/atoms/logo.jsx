import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo_small.png";
import { useNavigate } from "react-router-dom";

const Img = styled.img`
  height: 6vh;
`;


const Logo = () => {
  const routeChange = () =>{ 
    window.location.replace(`/home`);
  }
  return <Img src={logo} alt="oohub logo" style={{cursor:"pointer"}} onClick={() => {routeChange()}}/>;
};

export default Logo;
