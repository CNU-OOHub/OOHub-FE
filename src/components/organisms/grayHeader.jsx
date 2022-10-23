import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import logo from "../../assets/images/logo.png";

const Head = styled.div`
  width: 100%;
  height: 10vh;
  background-color: ${theme.grayColor};
  vertical-align: middle;
  padding: 15px;
`;

const GrayHeader = () => {
    return <Head>
      <div>
        <img alt="logo" src={logo} width='100' />      
      </div>

      </Head>;
};

export default GrayHeader;