import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authUser } from "../../api";
import logo from "../../assets/images/logo.png";
import Button from "../atoms/button";
import Input from "../atoms/input";
import FlexColumn from "../molecules/flexColumn";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/text";
import theme from "../../styles/theme";
import Body from "../atoms/body";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../atom";

const Logo = styled.img`
  width: 20rem;
  align-self: center;
`;

const LogIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
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

  const setLogin = useSetRecoilState(loginState);
  useEffect(() => {
    setLogin(false);
  });

  const authUserMutation = useMutation((userInfo) => authUser(userInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/home");
    },
  });

  const SignInButtonClicked = () => {
    if (hasBlank()) {
      alert("아이디와 비밀번호를 모두 작성해주세요.");
    } else {
      console.log(userInfo);
      authUserMutation.mutate(userInfo);
    }
  };

  return (
    <Body>
      <FlexColumn verticalPadding={5} justifyContent="space-evenly" width={25}>
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
        <Button
          onClick={() => {
            SignInButtonClicked();
          }}
          width={100}
          height={3.5}
          border="1px solid black"
          hoverEvent={true}
        >
          Sign In
        </Button>
        <div>
          <Text>Don't have an account? </Text>
          <Text
            onClick={() => {
              navigate("/signUp");
            }}
            color={theme.primaryColor}
          >
            SIGNUP!
          </Text>
        </div>
      </FlexColumn>
    </Body>
  );
};

export default LogIn;
