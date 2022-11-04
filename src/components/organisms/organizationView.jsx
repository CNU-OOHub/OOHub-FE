import React, { Fragment, useEffect, useState } from "react";
import theme from "../../styles/theme";
import styled from "styled-components";
import {
  addOrganization,
  addUserInOrganization,
  deleteOrganizationMember,
  deleteOrganization,
  useGetAdminOrganization,
  useGetAllOrganizations,
  useGetOrganizationMemberList,
} from "../../api";
import Button from "../atoms/button";
import Input from "../atoms/input";
import Text from "../atoms/text";
import { BiArrowFromLeft } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { adminState } from "../../atom";
import { useQueryClient } from "@tanstack/react-query";

// 레이아웃
const Content = styled.div`
  width: 100%;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  vertical-align: middle;
  padding-left: 3rem;
`;

const AdminContent = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const OrganizationContent = styled.div`
  width: 100%;
  height: 67vh;
  display: flex;
  flex-direction: row;
  padding-left: 3rem;
  padding-right: 3rem;
`;

// AdminContent
const CreateGroup = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const InsertUser = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// OrganizationContent

const LeftContent = styled.div`
  width: 25rem;
  height: 67vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MiddleContent = styled.div`
  width: 8rem;
  height: 67vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RightContent = styled.div`
  width: 30rem;
  height: 67vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Scroll = styled.div`
  width: 100%;
  height: 50vh;
  align-content: center;
  align-items: center;
  text-align: center;
  overflow: auto;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-radius: 10px;
  background: ${theme.greyColor};
`;

const SmallScroll = styled.div`
  width: 90%;
  height: 50vh;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.5rem;
  overflow: auto;
  border: 1px solid ${theme.lightGreyColor};
  border-radius: 10px;
  padding-top: 1rem;
`;

const OrganizationView = () => {
  const queryClient = useQueryClient();
  const username = localStorage.getItem("username");
  const admin = useRecoilValue(adminState);
  const [isClicked, setIsClicked] = useState(false);
  const [organizationInfo, setOrganizationInfo] = useState({
    organizationName: "",
  });
  const [userInfo, setUserInfo] = useState({
    username: "",
  });
  const [clickedOrganizationName, setClickedOrganizationName] = useState("");

  // usequery
  const { refetch: refetchOrganization, data: organizationList } =
    useGetAllOrganizations(username);
  const { refetch: refetchAdminOrganization, data: adminOrganizationList } =
    useGetAdminOrganization();
  const {
    refetch: refetchMember,
    isFetched,
    data: memberList,
  } = useGetOrganizationMemberList(clickedOrganizationName);

  // usequery refetch 변수
  const [changeMemberView, setChangeMemberView] = useState(false);
  const [changeOrganizationView, setChangeOrganizationView] = useState(false);
  const [changeAdminOrganizationView, setChangeAdminOrganizationView] =
    useState(false);

  React.useEffect(() => {
    if (changeOrganizationView) {
      refetchOrganization().then(() => {
        setChangeOrganizationView(false);
      });
    }
    if (changeAdminOrganizationView) {
      refetchAdminOrganization().then(() => {
        setChangeAdminOrganizationView(false);
      });
    }
    if (isClicked || changeMemberView) {
      refetchMember().then(() => {
        setChangeMemberView(false);
      });
    }
  }, [
    clickedOrganizationName,
    changeMemberView,
    changeOrganizationView,
    changeAdminOrganizationView,
    isClicked,
  ]);

  const organizationClicked = (text) => {
    setClickedOrganizationName(text);
    setIsClicked(true);
  };

  const changeOrganizationInfo = (name, value) => {
    setOrganizationInfo((prev) => ({ ...prev, [name]: value }));
  };

  const changeUserInfo = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const hasBlank = (info) => {
    if (Object.keys(info).find((key) => info[key] === "")) {
      return true;
    } else {
      return false;
    }
  };

  const createGroupClicked = (organizationInfo) => {
    if (hasBlank(organizationInfo)) {
      alert("그룹명을 작성해주세요.");
    } else {
      addOrganization(organizationInfo);
      if (admin) {
        setChangeAdminOrganizationView(true);
        queryClient.invalidateQueries();
        refetchAdminOrganization();
      } else {
        setChangeOrganizationView(true);
        queryClient.invalidateQueries();
        refetchOrganization();
      }
    }
  };

  const insertUserClicked = (userInfo) => {
    if (hasBlank(userInfo)) {
      alert("사용자명을 작성해주세요.");
    } else {
      addUserInOrganization(clickedOrganizationName, userInfo);
      setChangeMemberView(true);
      queryClient.invalidateQueries();
      refetchMember();
    }
  };

  const memberClicked = (username) => {
    console.log(username);
    if (admin) {
      if (window.confirm(username + " 사용자를 그룹에서 제외하시겠습니까?")) {
        deleteOrganizationMember(clickedOrganizationName, username);
        setChangeMemberView(true);
        queryClient.invalidateQueries();
        refetchMember();
      }
    }
  };

  const deleteOrganizationClicked = (organizationName) => {
    if (memberList.length != 0) {
      alert("그룹 멤버가 존재합니다.");
    } else {
      if (window.confirm(organizationName + " 그룹을 삭제하시겠습니까?")) {
        deleteOrganization(organizationName);
        setChangeAdminOrganizationView(true);
        setIsClicked(false);
        setClickedOrganizationName("");
        queryClient.invalidateQueries();
        refetchAdminOrganization();
      }
    }
  };

  return (
    <Content>
      {admin && (
        <AdminContent>
          <CreateGroup>
            <Input
              placeholder="new group name"
              onChange={(e) => {
                changeOrganizationInfo("organizationName", e.target.value);
              }}
            />
            <Button
              onClick={() => {
                createGroupClicked(organizationInfo);
              }}
              width={30}
              height={3.5}
              border="1px solid black"
              hoverEvent={true}
              color={theme.darkGreyColor}
            >
              그룹 생성
            </Button>
          </CreateGroup>
          <InsertUser>
            <Input
              id="usernameInput"
              placeholder="username"
              onChange={(e) => {
                changeUserInfo("username", e.target.value);
              }}
            />

            <Button
              id="insertUserBtn"
              onClick={() => {
                insertUserClicked(userInfo);
              }}
              width={25}
              height={3.5}
              border="1px solid black"
              hoverEvent={true}
              color={theme.darkGreyColor}
            >
              사용자 추가
            </Button>
            <Button
              id="deleteOrganizationBtn"
              onClick={() => {
                deleteOrganizationClicked(clickedOrganizationName);
              }}
              width={25}
              height={3.5}
              border="1px solid black"
              hoverEvent={true}
              color={theme.darkGreyColor}
              bgColor={theme.greyColor}
            >
              그룹 삭제
            </Button>
          </InsertUser>
        </AdminContent>
      )}

      <OrganizationContent>
        <LeftContent>
          <Text fontSize={1.5} fontWeight={"bold"} color={"white"}>
            My Group List
          </Text>
          <Scroll className="organizations">
            {(admin ? adminOrganizationList : organizationList)?.map((o) => (
              <Button
                key={o.id}
                onClick={(e) => {
                  organizationClicked(e.target.firstChild.data);
                }}
                width={80}
                height={3.5}
                border="1px solid black"
                hoverEvent={true}
                bgColor={"lightgray"}
                marginTop={1}
              >
                {o.name}
              </Button>
            ))}
          </Scroll>
        </LeftContent>
        <MiddleContent>
          <BiArrowFromLeft
            style={{ width: "50", height: "50", color: "gray" }}
          />
        </MiddleContent>
        <RightContent>
          {isClicked && (
            <Fragment>
              <Text fontSize={1.5} fontWeight={"bold"} color={"lightgray"}>
                {clickedOrganizationName} Members
              </Text>
              <SmallScroll className="usersView">
                {isFetched &&
                  memberList?.map((m) => (
                    <Button
                      key={m.id}
                      width={80}
                      height={3.5}
                      border="1px solid black"
                      hoverEvent={true}
                      bgColor={"white"}
                      marginTop={1}
                      fontSize={"1.5"}
                      onClick={(e) => {
                        memberClicked(m.username);
                      }}
                    >
                      <Text
                        fontSize={1}
                        fontWeight={"bold"}
                        color={"lightgray"}
                        marginRight={"2vh"}
                      >
                        {m.department}
                      </Text>
                      {m.username}
                    </Button>
                  ))}
              </SmallScroll>
            </Fragment>
          )}
        </RightContent>
      </OrganizationContent>
    </Content>
  );
};

export default OrganizationView;
