import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../atoms/logo";
import Text from "../atoms/text";
import FlexRow from "./flexRow";

const HomeHeader = () => {
  return (
    <FlexRow justifyContent="space-evenly">
      <Logo />
      <Text>hi</Text>
    </FlexRow>
  );
};

export default HomeHeader;
