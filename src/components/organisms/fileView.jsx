import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminState, fileShareState, loginState } from "../../atom";
import theme from "../../styles/theme";
import Body from "../atoms/body";
import {
  AiOutlineFolderOpen,
  AiOutlineSetting,
  AiOutlineSearch,
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineFolder,
  AiOutlineFile,
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
import {
  runFile,
  runLine,
  useGetAllOrganizations,
  useGetAllSharedFiles,
  useGetFiles,
} from "../../api";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { IoCloseOutline } from "react-icons/io5";
import { BsFolderPlus } from "react-icons/bs";
import { FiFilePlus } from "react-icons/fi";
import { Fragment } from "react";
import FlexColumn from "../molecules/flexColumn";
import { useRef } from "react";

import FolderTree, { testData } from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import { useMemo } from "react";

const fData = {
  name: "All Cryptos",
  children: [
    { name: "Bitcoin" },
    { name: "Etherium" },
    { name: "Polkadot" },
    {
      name: "POW",
      children: [
        { name: "Bitcoin" },
        { name: "Litecoin" },
        { name: "Bitcoin Cash" },
      ],
    },
    {
      name: "Public Chains",
      children: [
        { name: "Ripple" },
        { name: "Chainlink" },
        {
          name: "POW",
          children: [
            { name: "Bitcoin" },
            { name: "Litecoin" },
            { name: "Bitcoin Cash" },
          ],
        },
        {
          name: "POS",
          children: [
            { name: "Etherium" },
            { name: "EOS" },
            {
              name: "Crosschain",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: 92vh;
  background-color: ${theme.darkGreyColor};
  overflow: auto;
  white-space: nowrap;
  //resize: horizontal;
`;

const SearchArea = styled.div`
  height: 4rem;
  padding-top: 1rem;
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
  height: 4rem;
  align-items: center;
  flex-direction: row;
  display: flex;
  background-color: #373737;
`;

const FileContainer = styled.div`
  display: inline-block;
  flex: 1;
  background-color: ${theme.blackGreyColor};
`;

const FileContent = styled.textarea`
  font-size: 1.2rem;
  color: white;
  width: 100%;
  height: 100%;
  background-color: ${theme.blackGreyColor};
  border: none;
`;

const Terminal = styled.div`
  display: inline-block;
  height: 13rem;
  background-color: ${theme.blackGreyColor};
  border-top: 0.5px solid grey;
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
  padding: 0.5rem;
  border-radius: 10px;
  background: ${theme.blackGreyColor};
`;

const FileView = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [admin, setAdmin] = useRecoilState(adminState);
  const [sharedFileMenuOpened, SetSharedFileMenuOpened] = useState(false);
  const [myFileMenuOpened, SetMyFileMenuOpened] = useState(false);
  //const [fileShare, setFileShare] = useRecoilState(fileShareState);
  const [openedFileName, setOpenedFileName] = useState("파일명");
  /*
 일단 처음에 key들만 모아서 폴더명을 저장하는 애(folderNames)가 하나 있어야함. 
 /로 split해서 마지막 배열에 있는 값만 가져와서 folderNames 만들기.

 화면단에서는 workspace 명으로 폴더 하나 만들고, 
 1) 그거 누르면 key에서 k/로 시작하는 폴더들 가져와서 보여주고, k key에 있는 values에서 folderName에 없는 애들만 파일로 표시해서 보여줌.
 
 파일이든 폴더든 누르면 폴더명을 저장하는애에서 있으면 폴더로 판단해서 1)로 다시 반복, 만약 없으면 파일로 판단해서 api 불러서 내용 보여주기.
 */

  const [terminalOpened, setTerminalOpened] = useState(CONSOLE);
  // openedFile에 클릭한 파일명을 가져와서 넣고
  // "" 이 아닐때만 file 몸통 보여주기. ""이면 그냥 oohub 파일을 눌러주세요! 이런거 나오게
  // fileShare recoil은 필요 없을 듯. 굳이 recoil로 안하고 그냥 useState에다가 저장만 해도 될듯.
  const [sharedFiles, setSharedFiles] = useState([]);
  const onTreeStateChange = (state, event) => console.log(state, event);
  const [groupNames, setGroupNames] = useState([]);

  // 사용자가 속한 그룹 get
  const { data: groups, isLoading: getOrganizationIsLoading } =
    useGetAllOrganizations(localStorage.getItem("username"));

  const useSharedFiles = useGetAllSharedFiles(groupNames);

  useEffect(() => {
    if (!getOrganizationIsLoading) {
      const temp = Array.from(groups, (group) => group.name);
      setGroupNames(temp);
    }
  }, [getOrganizationIsLoading, groups]);

  const [fileContents, setFileContents] = useState({
    contents: "",
  });
  // 터미널 input 입력값
  const [terminalLine, setTerminalLine] = useState({
    command: "",
  });
  // 터미널 input 명령어, 결과값 map list
  // command: "",
  // runTerminalResult: []
  const [terminalDivList, setTerminalDivList] = useState([]);
  const [runConsoleResult, setRunConsoleResult] = useState([]);
  const [runTerminalResult, setRunTerminalResult] = useState([]);

  const [terminalItem, setTerminalItem] = useState({
    command: "",
    result: [],
  });

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setLogin(true);
    }
    if (localStorage.getItem("isAdmin") === "true") {
      setAdmin(true);
    }
  });

  const terminalClicked = (clickedValue) => {
    setTerminalOpened(clickedValue);
  };

  const changeFileContent = (name, changedValue) => {
    setFileContents((prev) => ({ ...prev, [name]: changedValue }));
    // console.log(fileContents);
  };

  const changeTerminalLine = (name, changedValue) => {
    setTerminalLine((prev) => ({ ...prev, [name]: changedValue }));
    // console.log(terminalLine);
  };

  const addTerminalDivList = () => {
    setTerminalDivList(...terminalDivList, terminalItem);
  };

  const changeTerminalItem = (command, result) => {
    console.log(command);
    console.log(result);

    setTerminalItem((prev) => ({ ...prev, command: command }));
    setTerminalItem((prev) => ({ ...prev, result: result }));

    addTerminalDivList();
    setTerminalDivList(...terminalDivList, {
      command: command,
      result: result,
    });

    console.log(terminalDivList);
  };

  const executeFileMutation = useMutation(
    (fileContents) => runFile(fileContents),
    {
      onSuccess: (data) => {
        setRunConsoleResult(data.result);
      },
    }
  );

  const executeTerminalMutation = useMutation(
    (terminalLine) => runLine(terminalLine),
    {
      onSuccess: (data) => {
        console.log(data.result[0]);
        setRunTerminalResult(data.result);
        changeTerminalItem(terminalLine, data.result);
      },
    }
  );

  // 파일 실행 api 호출
  const executeFile = () => {
    executeFileMutation.mutate(fileContents);
  };

  // 터미널 실행
  const terminalEntered = (e) => {
    if (e.key === "Enter") {
      executeTerminalMutation.mutate(terminalLine);
    }
  };

  return (
    <>
      <FileList>
        <SearchArea>
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
        </SearchArea>

        <div
          style={{
            alignItems: "center",
            height: "2rem",
            display: "flex",
          }}
        >
          <Button
            bgColor="rgb(0,0,0,0)"
            onClick={() => {
              SetSharedFileMenuOpened(!sharedFileMenuOpened);
            }}
          >
            {sharedFileMenuOpened ? (
              <AiFillCaretDown
                size={20}
                color={theme.textGreyColor}
                style={{ margin: "0 0.5rem 0 0.5rem" }}
              />
            ) : (
              <AiFillCaretUp
                size={20}
                color={theme.textGreyColor}
                style={{ margin: "0 0.5rem 0 0.5rem" }}
              />
            )}
          </Button>
          <Text color={theme.textGreyColor} fontSize={1.0}>
            공유파일
          </Text>
        </div>
        {sharedFileMenuOpened && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "0.5rem",
              width: "min-content",
            }}
          >
            {!getOrganizationIsLoading &&
              groupNames.map((group, idx) => {
                return (
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    key={group}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AiOutlineFolder
                        size={15}
                        color={theme.lightGreyColor}
                        style={{ marginLeft: "0.5rem" }}
                      />
                      <Text
                        color={theme.lightGreyColor}
                        fontSize={0.9}
                        fontWeight={600}
                        marginLeft="0.5rem"
                      >
                        {group}
                      </Text>
                    </div>
                    <div>
                      {!useSharedFiles[idx].isLoading &&
                        useSharedFiles[idx]["data"].length > 0 &&
                        // useSharedFiles[idx]["data"][0] !== undefined &&
                        useSharedFiles[idx]["data"].map((fileInfo) => {
                          console.log(fileInfo);
                          return (
                            <div
                              key={fileInfo.filepath}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <AiOutlineFile
                                size={15}
                                color={theme.lightGreyColor}
                                style={{ marginLeft: "1rem" }}
                              />
                              <Text
                                onClick={() => {
                                  console.log("hi");
                                }}
                                color={theme.lightGreyColor}
                                fontSize={0.9}
                                fontWeight={600}
                                marginLeft="0.5rem"
                              >
                                {fileInfo.filename}
                              </Text>
                              <Text
                                color={theme.lightGreyColor}
                                fontSize={0.5}
                                fontWeight={300}
                                marginLeft="0.5rem"
                              >
                                {fileInfo.filepath}
                              </Text>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        <div
          style={{
            alignItems: "center",
            height: "2rem",
            backgroundColor: `${theme.darkGreyColor}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              bgColor="rgb(0,0,0,0)"
              onClick={() => SetMyFileMenuOpened(!myFileMenuOpened)}
            >
              {myFileMenuOpened ? (
                <AiFillCaretDown
                  size={20}
                  color={theme.textGreyColor}
                  style={{ margin: "0 0.5rem 0 0.5rem" }}
                />
              ) : (
                <AiFillCaretUp
                  size={20}
                  color={theme.textGreyColor}
                  style={{ margin: "0 0.5rem 0 0.5rem" }}
                />
              )}
            </Button>
            <Text color={theme.textGreyColor} fontSize={1.0}>
              내 파일
            </Text>
          </div>
          <div>
            <BsFolderPlus
              size={15}
              color={theme.textGreyColor}
              style={{ marginRight: "0.5rem" }}
            />
            <FiFilePlus size={15} color={theme.textGreyColor} style={{}} />
          </div>
        </div>
        {myFileMenuOpened && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              marginBottom: "0.5rem",
              width: "min-content",
            }}
          >
            <FolderTree
              data={fData}
              onChange={onTreeStateChange}
              showCheckbox={false}
            />
            <Text
              color={theme.lightGreyColor}
              fontSize={0.9}
              marginLeft="0.5rem"
            >
              공유하는그룹명
            </Text>
            <Text color={theme.lightGreyColor} fontSize={0.9} marginLeft="1rem">
              공유하는파일명.pyㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
            </Text>
            <Text color={theme.lightGreyColor} fontSize={0.9} marginLeft="1rem">
              공유하는파일명.py
            </Text>
            <Text color={theme.lightGreyColor} fontSize={0.9} marginLeft="1rem">
              공유하는파일명.py
            </Text>
          </div>
        )}
      </FileList>
      <File>
        <FileHeader>
          <FlexRow justifyContent="center" flexGrow={1}>
            <Text color={theme.textGreyColor} fontSize={1}>
              {openedFileName}
            </Text>
            <IoIosClose size={20} color={theme.textGreyColor} />
            <div style={{ marginLeft: "3vh" }}>
              <VscRunAll
                size="20"
                color="green"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  executeFile();
                }}
              />
            </div>
          </FlexRow>
          <div style={{ width: "6rem" }}>
            <DropDown
              onChange={(e) => {
                // setFileShare((prev) => ({
                //   ...prev,
                //   groupName: e.target.value,
                // }));
              }}
              options={getOrganizationIsLoading ? [] : groupNames}
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
                // if (fileShare.groupName === "") {
                //   alert("그룹명을 선택하여 주세요.");
                // } else {
                //   setFileShare((prev) => ({
                //     ...prev,
                //     available: e,
                //   }));
                // }
              }}
              //checked={fileShare.available}
              checked={false}
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
              changeFileContent("contents", e.target.value);
            }}
            onKeyDown={(e) => {
              // enterEvent()
            }}
          ></FileContent>
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
          {terminalOpened === TERMINAL ? (
            // 터미널
            <Scroll>
              <div style={{ color: "white", padding: "10px", float: "left" }}>
                {/* {terminalDivList &&
                  terminalDivList.map((result,i)=>{
                    console.log(result[i]);
                    return <p color="white" style={{fontSize: "1.2rem", fontWeight:"normal",}}>{result[i]}</p>;
                  })              
              }  */}
                <text
                  style={{
                    color: "white",
                    float: "left",
                    outline: "none",
                    fontWeight: "bolder",
                  }}
                >
                  {">>>  "}{" "}
                </text>
                <input
                  type={"text"}
                  style={{
                    outline: "none",
                    backgroundColor: theme.blackGreyColor,
                    color: "white",
                    border: "none",
                    float: "left",
                    marginLeft: "10px",
                  }}
                  onChange={(e) => {
                    changeTerminalLine("command", e.target.value);
                  }}
                  onKeyDown={(e) => {
                    terminalEntered(e);
                  }}
                ></input>
                <br></br>
                <p
                  color="white"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "normal",
                    float: "left",
                  }}
                >
                  {terminalItem.result}
                </p>
              </div>
              ;
            </Scroll>
          ) : (
            // 콘솔
            <Scroll>
              <div style={{ color: "white", padding: "10px", float: "left" }}>
                {runConsoleResult.map((result) => {
                  return (
                    <p
                      color="white"
                      style={{ fontSize: "1.2rem", fontWeight: "normal", textAlign:"left"}}
                    >
                      {result}
                    </p>
                  );
                })}
              </div>
            </Scroll>
          )}
        </Terminal>
      </File>
    </>
  );
};

export default FileView;
