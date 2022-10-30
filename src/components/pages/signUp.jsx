import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { addUser, addWorkspace, useGetAllDepartments } from "../../api";
import logo from "../../assets/images/logo.png";
import Button from "../atoms/button";
import DropDown from "../atoms/dropdown";
import Input from "../atoms/input";
import FlexColumn from "../molecules/flexColumn";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/text";
import theme from "../../styles/theme";
import Body from "../atoms/body";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../atom";

const Logo = styled.img`
  width: 20rem;
  align-self: center;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const departments = ["frontend", "backend", "test", "devops"];
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    departmentName: "",
    workspaceName: "",
  });

  const setLogin = useSetRecoilState(loginState);
  const { data: departmentList } = useGetAllDepartments();

  React.useEffect(() => {
    setLogin(false);
  });

  const changeUserInfo = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const hasBlank = () => {
    if (Object.keys(userInfo).find((key) => userInfo[key] === "")) {
      return true;
    } else {
      return false;
    }
  };

  const addUserMutation = useMutation((userInfo) => addUser(userInfo), {
    onSuccess: () => {
      createWorkspaceMutation.mutate(userInfo.username);
    },
  });

  const createWorkspaceMutation = useMutation(
    (username) => addWorkspace({ username: username }),
    {
      onSuccess: () => {
        navigate("/login");
        queryClient.invalidateQueries();
      },
    }
  );

  const SignUpButtonClicked = () => {
    if (hasBlank()) {
      alert("빈칸없이 작성해주세요.");
    } else {
      addUserMutation.mutate(userInfo);
    }
  };

  return (
    <Body>
      <FlexColumn justifyContent="space-evenly" width={25}>
        <Logo src={logo} alt="oohub" />
        <Input
          placeholder="username"
          onChange={(e) => {
            changeUserInfo("username", e.target.value);
          }}
        />
        <Input
          inputType="password"
          placeholder="password"
          onChange={(e) => {
            changeUserInfo("password", e.target.value);
          }}
        />
        <DropDown
          placeholder="department"
          options={(departmentList || []).map((d) => d.name)}
          onChange={(e) => {
            changeUserInfo("departmentName", e.target.value);
          }}
        />
        <Input
          placeholder="workspace name"
          onChange={(e) => {
            changeUserInfo("workspaceName", e.target.value);
          }}
        />
        <Button
          onClick={() => {
            SignUpButtonClicked();
          }}
          width={100}
          height={3.5}
          border="1px solid black"
          hoverEvent={true}
        >
          Sign Up
        </Button>
        <div>
          <Text>Do you have an account? </Text>
          <Text
            onClick={() => {
              navigate("/logIn");
            }}
            color={theme.primaryColor}
          >
            SIGNIN!
          </Text>
        </div>
      </FlexColumn>
    </Body>
  );
};

export default SignUp;
