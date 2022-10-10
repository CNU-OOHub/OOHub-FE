import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import Button from "../atoms/button";
import DropDown from "../atoms/dropdown";
import Input from "../atoms/input";
import FlexColumn from "../molecules/flexColumn";
import Header from "../organisms/header";

const Logo = styled.img`
  width: 20rem;
  align-self: center;
`;

const SignUp = () => {
  const departments = ["frontend", "backend", "test", "devops"];
  return (
    <div style={{ height: "100vh" }}>
      <FlexColumn justifyContent="space-evenly" width={25}>
        <Logo src={logo} alt="oohub" />
        <Input placeholder=" id" />
        <Input placeholder=" pw" />
        <DropDown placeholder="department" options={departments} />
        <Input placeholder=" workspace name" />
        <Button
          onClick={() => {
            console.log("클릭");
          }}
          width={100}
          height={3.5}
          border="1px solid black"
        >
          Sign Up
        </Button>
      </FlexColumn>
    </div>
  );
};

export default SignUp;
