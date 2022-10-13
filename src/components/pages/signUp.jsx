import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { addUser } from "../../api";
import logo from "../../assets/images/logo.png";
import Button from "../atoms/button";
import DropDown from "../atoms/dropdown";
import Input from "../atoms/input";
import FlexColumn from "../molecules/flexColumn";
import { useNavigate } from "react-router-dom";
import Header from "../organisms/header";

const Logo = styled.img`
  width: 20rem;
  align-self: center;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const departments = ["frontend", "backend", "test", "devops"];
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    departmentName: "",
    workspaceName: "",
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
      queryClient.invalidateQueries();
      navigate("/logIn");
    },
  });

  const SignUpButtonClicked = () => {
    if (hasBlank()) {
      alert("작성");
    } else {
      console.log(userInfo);
      addUserMutation.mutate(userInfo);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
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
          options={departments}
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
      </FlexColumn>
    </div>
  );
};

export default SignUp;
