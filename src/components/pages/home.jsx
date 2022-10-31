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
  display: flex;
  flex-direction: column;
  // bottom: 0;
  /* overflow: auto;
  resize: inherit; */
`;

const TerminalHeader = styled.div`
  margin-left: 1rem;
`;

const Scroll = styled.div`
  width: 100%;
  height: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
  overflow: scroll;
  // margin-top: 1.5rem;
  // padding-top: 1rem;
  border-radius: 10px;
  background: ${theme.blackGreyColor};
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
<<<<<<< refs/remotes/origin/develop
        <SideMenu />
        {sideMenu === FOLDER && <FileView />}
        {sideMenu === GROUPS && <OrganizationView />}
=======
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
          <Button
            bgColor={theme.greyColor}
            onClick={() => sideMenuClicked(GROUPS)}
          >
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
              <div style={{marginLeft:"3vh"}}>
              <VscRunAll IoIosClose size="20" color="green" style={{cursor:"pointer"}} onClick={() => {
                  executeFile();
                }}/>
              </div>
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
                  setFileShare((prev) => ({
                    ...prev,
                    available: e,
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
          <FileContainer>
          <FileContent 
            name="fileContentArea" 
            onChange={(e) => {
                changeFileContent("contents",e.target.value);
              }} 
            onKeyDown = {(e) => {
              // enterEvent()
            }}>


          </FileContent>

          </FileContainer>
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
                  console.log(fileShare.available);
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
            {terminalOpened===TERMINAL? 
              <div style={{margin:"10px"}}>
              <text style={{color:"white", float:"left" ,outline: "none", fontWeight:"bolder"}}>{'>>>  '} </text>             
              <input type={"text"} style={{outline:"none",backgroundColor:theme.blackGreyColor, color:"white", border:"none", float:"left", marginLeft:"10px"}}></input>
              </div>
            :
            <Scroll>
            <div style={{color:"white", padding:"10px",float:"left"}}>
              {runResult.map((result)=>{
                return <p color="white" style={{fontSize: "1.2rem", fontWeight:"normal",}}>{result}</p>;
              })}
            </div>
            </Scroll>
            }
            
          </Terminal>
        </File>
>>>>>>> feat: 콘솔, 터미널 css 구분
      </FlexRow>
    </Body>
  );
};

export default Home;
