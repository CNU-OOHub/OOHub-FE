import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminState, fileShareState, loginState } from "../../atom";
import { FOLDER, GROUPS } from "../../constants";
import theme from "../../styles/theme";
import Body from "../atoms/body";
import {
  AiOutlineFolderOpen,
  AiOutlineSetting,
  AiOutlineSearch,
} from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { RiGroup2Line } from "react-icons/ri";
import Button from "../atoms/button";
import { CONSOLE, FOLDER, GROUPS, SETTING, TERMINAL } from "../../constants";
import styled from "styled-components";
import FlexRow from "../molecules/flexRow";
import Text from "../atoms/text";
import DropDown from "../atoms/dropdown";
import Switch from "react-switch";
import Input from "../atoms/input";
import { VscRunAll } from "react-icons/vsc";
import { runFile } from "../../api";
import { QueryClient, useMutation } from "@tanstack/react-query";

import { sideMenuState } from "../../atom";

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
  // padding-top:1rem;
  // padding-left:1rem;

`;

const FileContent = styled.textarea`
font-size : 1.2rem;
  color: white;
  width: 100%; 
  height: 100%; 
  background-color: ${theme.fileContainerColor};
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
  const [openedFile, setOpenedFile] = useState("test.py");
  const [terminalOpened, setTerminalOpened] = useState(CONSOLE);
  const [fileContents, setFileContents] = useState({
    contents: ""
  });
  const [codeLine, setCodeLine] = useState("");
  const [runResult, setRunResult] = useState([]);
  const [result, setResult] = useState([]);
  const sideMenu = useRecoilValue(sideMenuState);

  
  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setLogin(true);
    }
    if (localStorage.getItem("isAdmin") === "true") {
      setAdmin(true);
    }
  });

  const sideMenuClicked = (clickedValue) => {
    setSideMenu(clickedValue);
  };

  const terminalClicked = (clickedValue) => {
    setTerminalOpened(clickedValue);
  };

  const changeFileContent = (name, changedValue) => {
    setFileContents((prev) => ({...prev, [name]: changedValue}));
    // console.log(fileContents);
  };

  const executeFileMutation = useMutation((fileContents) => runFile(fileContents), {
    onSuccess: (data) => {
      setRunResult(data.result);
    },
  });

  // 파일 실행 api 호출 
  const executeFile = () => {
    console.log(fileContents)
    executeFileMutation.mutate(fileContents);
    // const {result: resultList} = runFile(fileContents);
    // console.log(resultList);
    // if (typeof resultList !== 'undefined'){
    //   setResult(resultList);      
    //   console.log(resultList);
    // }
  };

  const groups = ["그룹1", "그룹2", "그룹3"];

  return (
    <Body backgroundColor={theme.darkGreyColor}>
      <FlexRow>
        <SideMenu />
        {sideMenu === FOLDER && <FileView />}
        {sideMenu === GROUPS && <OrganizationView />}
      </FlexRow>
    </Body>
  );
};

export default Home;
