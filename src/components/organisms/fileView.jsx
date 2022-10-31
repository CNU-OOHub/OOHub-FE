import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminState, fileShareState, loginState } from "../../atom";
import theme from "../../styles/theme";
import {
  AiOutlineSearch,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { BsFolderPlus } from "react-icons/bs";
import { FiFilePlus } from "react-icons/fi";
import Button from "../atoms/button";
import { CONSOLE, TERMINAL } from "../../constants";
import styled from "styled-components";
import FlexRow from "../molecules/flexRow";
import Text from "../atoms/text";
import DropDown from "../atoms/dropdown";
import Switch from "react-switch";
import Input from "../atoms/input";
import { VscRunAll } from "react-icons/vsc";
import { Fragment } from "react";
import FlexColumn from "../molecules/flexColumn";
import { useRef } from "react";
import { useGetAllOrganizations } from "../../api";

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

const FileView = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [sharedFileMenuOpened, SetSharedFileMenuOpened] = useState(false);
  const [myFileMenuOpened, SetMyFileMenuOpened] = useState(false);
  const [fileShare, setFileShare] = useRecoilState(fileShareState);
  const [openedFile, setOpenedFile] = useState("파일명");
  const [terminalOpened, setTerminalOpened] = useState(CONSOLE);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setLogin(true);
    }
  });

  const terminalClicked = (clickedValue) => {
    setTerminalOpened(clickedValue);
  };
  const { data: groups, isLoading } = useGetAllOrganizations(
    localStorage.getItem("username")
  );

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
            height: "3rem",
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
        <div
          style={{
            alignItems: "center",
            height: "3rem",
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
              size={20}
              color={theme.textGreyColor}
              style={{ marginRight: "0.5rem" }}
            />
            <FiFilePlus
              size={20}
              color={theme.textGreyColor}
              style={{ marginRight: "0.5rem" }}
            />
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
              {openedFile}
            </Text>
            <IoCloseOutline size={20} color={theme.textGreyColor} />
            <VscRunAll size={20} color="green" />
          </FlexRow>
          <div style={{ width: "6rem" }}>
            <DropDown
              onChange={(e) => {
                setFileShare((prev) => ({
                  ...prev,
                  groupName: e.target.value,
                }));
              }}
              options={
                isLoading ? [] : Array.from(groups, (group) => group.name)
              }
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
                if (fileShare.groupName === "") {
                  alert("그룹명을 선택하여 주세요.");
                } else {
                  setFileShare((prev) => ({
                    ...prev,
                    available: e,
                  }));
                }
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
          <FileContent name="inputstr2"></FileContent>
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
        </Terminal>
      </File>
    </>
  );
};

export default FileView;
