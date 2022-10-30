import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminState, fileShareState, loginState } from "../../atom";
import theme from "../../styles/theme";
import Body from "../atoms/body";
import {
  AiOutlineFolderOpen,
  AiOutlineSetting,
  AiOutlineSearch,
} from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import Button from "../atoms/button";
import { CONSOLE, FOLDER, SETTING, TERMINAL } from "../../constants";
import styled from "styled-components";
import FlexColumn from "../molecules/flexColumn";
import FlexRow from "../molecules/flexRow";
import Text from "../atoms/text";
import DropDown from "../atoms/dropdown";
import Switch from "react-switch";
import Input from "../atoms/input";

const SideMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 92vh;
  background-color: ${theme.greyColor};
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  height: 92vh;
  background-color: ${theme.darkGreyColor};
  overflow: auto;
  resize: horizontal;
`;

const File = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 92vh;
  background-color: ${theme.blackGreyColor};
  justify-content: space-around;
`;

const FileHeader = styled.div`
  //flex-grow: 0.1;
  // display: inline-block;
  height: 4rem;
  align-items: center;
  flex-direction: row;
  display: flex;
  // display: flex;
  //border: 0.5px solid grey;
  /* box-shadow: 0.5px 0.5px 8px 2px black; */
  background-color: #373737;
`;

const FileContainer = styled.div`
  display: inline-block;
  flex: 1;
  // height: auto;
  //height: 30rem;
  //flex-grow: 10;
  background-color: ${theme.blackGreyColor};
`;

const Terminal = styled.div`
  display: inline-block;
  //flex-grow: 4;
  //height: 100%;
  height: 13rem;
  background-color: ${theme.blackGreyColor};
  border-top: 0.5px solid grey;
  // display: flex;
  // bottom: 0;
  /* overflow: auto;
  resize: inherit; */
`;

const TerminalHeader = styled.div`
  margin-left: 1rem;
`;

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [admin, setAdmin] = useRecoilState(adminState);
  const [sideMenu, setSideMenu] = useState(FOLDER);
  const [fileShare, setFileShare] = useRecoilState(fileShareState);
  const [openedFile, setOpenedFile] = useState("파일명");
  const [terminalOpened, setTerminalOpened] = useState(CONSOLE);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setLogin(true);
    }
    if (localStorage.getItem("isAdmin")) {
      setAdmin(true);
    }
  });

  const sideMenuClicked = (clickedValue) => {
    setSideMenu(clickedValue);
  };

  const terminalClicked = (clickedValue) => {
    setTerminalOpened(clickedValue);
  };

  const groups = ["그룹1", "그룹2", "그룹3"];

  return (
    <Body backgroundColor={theme.darkGreyColor}>
      <FlexRow>
        <SideMenuStyle>
          <Button
            bgColor={theme.greyColor}
            onClick={() => sideMenuClicked(FOLDER)}
          >
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
        </SideMenuStyle>
        <FileList>
          <div
            className="SearchArea"
            style={{
              height: "4rem",
              paddingTop: "1rem",
            }}
          >
            <FlexRow justifyContent="center">
              <Input
                className="SearchForm"
                inputType="text"
                placeholder="검색어"
                height={2}
                width={65}
                fontSize={13}
              />
              <AiOutlineSearch size={23} color={theme.textGreyColor} />
            </FlexRow>
          </div>
          <div>파일 리스트 들어올 자리</div>
        </FileList>
        <File>
          <FileHeader>
            <FlexRow justifyContent="center" flexGrow={1}>
              <Text color={theme.textGreyColor} fontSize={1}>
                {openedFile}
              </Text>
              <IoIosClose size={20} color={theme.textGreyColor} />
            </FlexRow>
            <div style={{ width: "6rem" }}>
              <DropDown
                options={groups}
                placeholder="그룹명"
                color={theme.textGreyColor}
                height={2}
                fontSize={1.0}
                backgroundColor="#373737"
              />
            </div>
            <FlexRow flexGrow={1} justifyContent="center">
              <Text color={theme.textGreyColor} fontSize={1}>
                공유
              </Text>
              <Switch
                onChange={(e) => {
                  console.log(e);
                  setFileShare((prev) => ({
                    ...prev,
                    available: !fileShare.available,
                  }));
                }}
                checked={fileShare.available}
                onColor={theme.primaryColor}
                handleDiameter={17}
                uncheckedIcon={false}
                checkedIcon={false}
                width={45}
                height={25}
              />
            </FlexRow>
          </FileHeader>
          <FileContainer>d</FileContainer>
          <Terminal>
            <TerminalHeader>
              <Button
                color={
                  terminalOpened === CONSOLE ? "white" : theme.lightGreyColor
                }
                fontSize={0.8}
                bgColor={theme.blackGreyColor}
                height={2}
                marginRight={2}
                fontWeight={400}
                onClick={() => {
                  terminalClicked(CONSOLE);
                }}
                {...(terminalOpened === CONSOLE && {
                  borderBottom: "1px solid white",
                })}
              >
                콘솔
              </Button>
              <Button
                color={
                  terminalOpened === TERMINAL ? "white" : theme.lightGreyColor
                }
                fontSize={0.8}
                bgColor={theme.blackGreyColor}
                height={2}
                fontWeight={400}
                onClick={(e) => {
                  terminalClicked(TERMINAL);
                }}
                {...(terminalOpened === TERMINAL && {
                  borderBottom: "1px solid white",
                })}
              >
                터미널
              </Button>
            </TerminalHeader>
          </Terminal>
        </File>
      </FlexRow>
    </Body>
  );
};

export default Home;
