import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminState, loginState } from "../../atom";
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