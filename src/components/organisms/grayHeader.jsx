import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import logo from "../../assets/images/logo.png";
import FlexColumn from "../molecules/flexColumn";

const Head = styled.div`
  width: 100%;
  height: 8vh;
  background-color: ${theme.grayColor};
  vertical-align: middle;
  padding: 9px;
`;

const GrayHeader = () => {
    return <Head>
      <div>
        <img src={logo} width='100' height='40'/>      
      </div>

      </Head>;
};

export default GrayHeader;