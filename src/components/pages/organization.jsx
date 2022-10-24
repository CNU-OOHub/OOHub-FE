import React, { useEffect, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Body from "../atoms/body";
import styled from "styled-components";
import {
  addOrganization,
  addUserInOrganization,
  getAllOrganization,
  useGetAllOrganizations,
  useGetOrganizationMemberList,
} from "../../api";
import Button from "../atoms/button";
import Input from "../atoms/input";
import Text from "../atoms/text";
import { BiArrowFromLeft } from "react-icons/bi";

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
  flex-directioin: row;
`;
const LeftContent = styled.div`
  width: 726px;
  height: 100%;
  padding-left: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiddleContent = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 23rem;
`;

const RightContent = styled.div`
  width: 710px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateGroup = styled.div`
  width: 25rem;
  position: fix;
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  vertical-align: middle;
  padding-top: 2rem;
`;

const InsertUser = styled.div`
  width: 25rem;
  position: fix;
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  vertical-align: middle;
  padding-top: 2rem;
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
  const username = "mirae";
  const queryClient = useQueryClient();
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

  const organizationClicked = (text) => {
    setClickedOrganizationName(text);
  };

  React.useEffect(() => {
    refetch();
  }, [clickedOrganizationName, userInfo]);

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
    }
  };

  return (
    <Body>
      <SideMenu></SideMenu>
      <Content>
        <LeftContent>
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
          <Text fontSize={1.5} fontWeight={"bold"}>
            My Group List
          </Text>
          <Scroll className="organizations">
            {organizationList &&
              organizationList.map((o) => (
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
          <InsertUser>
            <Input
              placeholder="username"
              onChange={(e) => {
                changeUserInfo("username", e.target.value);
              }}
            />
            <Button
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
          <Text fontSize={1.5} fontWeight={"bold"} color={"lightgray"}>
            {clickedOrganizationName} Members
          </Text>
          <SmallScroll className="usersView">
            {isFetched &&
              memberList &&
              memberList.map((m) => (
                <Button
                  key={m.id}
                  width={80}
                  height={3.5}
                  border="1px solid black"
                  hoverEvent={true}
                  bgColor={"white"}
                  marginTop={1}
                  fontSize={"1.5"}
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
        </RightContent>
      </Content>
    </Body>
  );
};

export default Organization;
