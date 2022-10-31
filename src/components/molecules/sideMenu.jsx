import React from "react";
import theme from "../../styles/theme";
import styled from "styled-components";
import { FOLDER, GROUPS, SETTING } from "../../constants";
import Button from "../atoms/button";
import { AiOutlineFolderOpen, AiOutlineSetting } from "react-icons/ai";
import { RiGroup2Line } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { sideMenuState } from "../../atom";

const SideMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 92vh;
  background-color: ${theme.greyColor};
`;

const SideMenu = () => {
  const [sideMenu, setSideMenu] = useRecoilState(sideMenuState);
  const sideMenuClicked = (clickedValue) => {
    setSideMenu(clickedValue);
  };
  return (
    <SideMenuStyle>
      <Button bgColor={theme.greyColor} onClick={() => sideMenuClicked(FOLDER)}>
        <AiOutlineFolderOpen
          style={{
            marginTop: "1rem",
            width: "100%",
            borderLeft: sideMenu === FOLDER ? "5px solid white" : "none",
          }}
          size={35}
          color={sideMenu === FOLDER ? "white" : theme.lightGreyColor}
        />
      </Button>
      <Button
        bgColor={theme.greyColor}
        onClick={() => sideMenuClicked(SETTING)}
      >
        <AiOutlineSetting
          style={{
            marginTop: "1rem",
            width: "100%",
            borderLeft: sideMenu === SETTING ? "5px solid white" : "none",
          }}
          size={35}
          color={sideMenu === SETTING ? "white" : theme.lightGreyColor}
        />
      </Button>
      <Button bgColor={theme.greyColor} onClick={() => sideMenuClicked(GROUPS)}>
        <RiGroup2Line
          style={{
            marginTop: "1rem",
            width: "100%",
            borderLeft: sideMenu === GROUPS ? "5px solid white" : "none",
          }}
          size={35}
          color={sideMenu === GROUPS ? "white" : theme.lightGreyColor}
        />
      </Button>
    </SideMenuStyle>
  );
};

export default SideMenu;
