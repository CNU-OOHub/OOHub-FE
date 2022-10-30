import React, { Fragment, useEffect, useState } from "react";
import Body from "../atoms/body";
import styled from "styled-components";
import {
  addOrganization,
  addUserInOrganization,
  deleteOrganizationMember,
  useGetAllOrganizations,
  useGetOrganizationMemberList,
} from "../../api";
import Button from "../atoms/button";
import Input from "../atoms/input";
import Text from "../atoms/text";
import { BiArrowFromLeft } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { adminState } from "../../atom";

// 레이아웃

const SideMenu = styled.div`
  position: fixed;
  left: 0;
  width: 4rem;
  height: 100%;
  background: lightgray;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  vertical-align: middle;
`;

const AdminContent = styled.div`
  width: 100%;
  position: fix;
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-left: 4rem;
  padding-top: 3rem;
`;

const OrganizationContent = styled.div`
  width: 100%;
  height: 30.5rem;
  display: flex;
  flex-direction: row;
  padding-left: 4rem;
  padding-top: 2rem;
`;

// AdminContent

const CreateGroup = styled.div`
  width: 25rem;
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  vertical-align: middle;
`;

const InsertUser = styled.div`
  width: 25rem;
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  vertical-align: middle;
`;

// OrganizationContent

const LeftContent = styled.div`
  width: 726px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MiddleContent = styled.div`
  width: 100px;
  height: 100%;
  align-items: center;
  padding-top: 10rem;
`;

const RightContent = styled.div`
  width: 710px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Scroll = styled.div`
  width: 80%;
  height: 25rem;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  overflow: auto;
  padding-top: 1rem;
`;

const SmallScroll = styled.div`
  width: 80%;
  height: 25rem;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  overflow: auto;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-top: 1rem;
`;

const Organization = () => {
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

  const { data: organizationList } = useGetAllOrganizations(username);

  const {
    refetch,
    isFetched,
    data: memberList,
  } = useGetOrganizationMemberList(clickedOrganizationName);

  const [changeMemberView, setChangeMemberView] = useState(false);

  const organizationClicked = (text) => {
    setClickedOrganizationName(text);
    setIsClicked(true);
  };

  React.useEffect(() => {
    refetch().then(() => {
      setChangeMemberView(false);
    });
  }, [clickedOrganizationName, changeMemberView]);

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
    }
  };

  const insertUserClicked = (userInfo) => {
    if (hasBlank(userInfo)) {
      alert("사용자명을 작성해주세요.");
    } else {
      addUserInOrganization(clickedOrganizationName, userInfo);
      setChangeMemberView(true);
    }
  };

  const memberClicked = (username) => {
    console.log(username);
    if (admin) {
      if (window.confirm(username + " 사용자를 그룹에서 제외하시겠습니까?")) {
        deleteOrganizationMember(clickedOrganizationName, username);
        setChangeMemberView(true);
      }
    }
  };

  return (
    <Body>
      <SideMenu></SideMenu>
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
                width={30}
                height={3.5}
                border="1px solid black"
                hoverEvent={true}
              >
                사용자 추가
              </Button>
            </InsertUser>
          </AdminContent>
        )}

        <OrganizationContent>
          <LeftContent>
            <Text fontSize={1.5} fontWeight={"bold"}>
              My Group List
            </Text>
            <Scroll className="organizations">
              {organizationList?.map((o) => (
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
                    memberList?.map(
                      (m) =>
                        m.username !== username && (
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
                        )
                    )}
                </SmallScroll>
              </Fragment>
            )}
          </RightContent>
        </OrganizationContent>
      </Content>
    </Body>
  );
};

export default Organization;
