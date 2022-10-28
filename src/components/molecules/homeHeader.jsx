import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { adminCategoryModalVisibleState } from "../../atom";
import theme from "../../styles/theme";
import Logo from "../atoms/logo";
import Text from "../atoms/text";
import FlexRow from "./flexRow";

const HomeHeader = () => {
  const [adminCategoryModalVisible, setAdminCategoryModalVisible] =
    useRecoilState(adminCategoryModalVisibleState);

  const onClickAdminButton = () => {
    setAdminCategoryModalVisible(!adminCategoryModalVisible);
  };
  return (
    <div
      style={{
        border: "1px solid grey",
        padding: "1vh",
        backgroundColor: `${theme.greyColor}`,
      }}
    >
      <FlexRow>
        <Logo />
        <Text color={theme.textGreyColor}>File</Text>
        <Text color={theme.textGreyColor}>Edit</Text>
        <Text color={theme.textGreyColor}>View</Text>
        <Text color={theme.textGreyColor}>Run</Text>
        <Text color={theme.textGreyColor}>Settings</Text>
        <Text color={theme.textGreyColor}>Help</Text>
        <Text />
        <Text />
        <Text color={theme.textGreyColor}>부서명</Text>
        <Text color={theme.textGreyColor}>Groups</Text>
        <Text color={theme.textGreyColor} onClick={onClickAdminButton}>
          Admin
        </Text>
      </FlexRow>
    </div>
  );
};

export default HomeHeader;
