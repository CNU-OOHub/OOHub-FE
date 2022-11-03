import React from "react";
import { useRecoilState } from "recoil";
import { adminCategoryModalVisibleState, adminState } from "../../atom";
import theme from "../../styles/theme";
import Logo from "../atoms/logo";
import Text from "../atoms/text";
import FlexRow from "./flexRow";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {

  let navigate = useNavigate(); 

  const routeChange = () =>{ 
    navigate(`/monitoring`);
  }

  const [adminCategoryModalVisible, setAdminCategoryModalVisible] =
    useRecoilState(adminCategoryModalVisibleState);
  const [admin, setAdmin] = useRecoilState(adminState);

  const onClickAdminButton = () => {
    setAdminCategoryModalVisible(!adminCategoryModalVisible);
  };

  const onClickMonitoringButton = () => {
    routeChange();
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
        <Text color={theme.textGreyColor} onClick={onClickMonitoringButton}>Monitoring</Text>
        <Text/>
        <Text color={theme.primaryColor}>
          {localStorage.getItem("departmentName")}
        </Text>
        {admin && (
          <Text color={theme.textGreyColor} onClick={onClickAdminButton}>
            Admin
          </Text>
        )}
      </FlexRow>
    </div>
  );
};

export default HomeHeader;
