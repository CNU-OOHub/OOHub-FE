import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminState, loginState } from "../../atom";
import { FOLDER, GROUPS } from "../../constants";
import theme from "../../styles/theme";
import Body from "../atoms/body";
import FlexRow from "../molecules/flexRow";
import SideMenu from "../molecules/sideMenu";
import FileView from "../organisms/fileView";
import OrganizationView from "../organisms/organizationView";

import { sideMenuState } from "../../atom";

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [admin, setAdmin] = useRecoilState(adminState);
  const sideMenu = useRecoilValue(sideMenuState);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setLogin(true);
    }
    if (localStorage.getItem("isAdmin") === "true") {
      setAdmin(true);
    }
  });

  return (
    <Body backgroundColor={theme.darkGreyColor}>
      <FlexRow>
        <SideMenu />
        {sideMenu === FOLDER && <FileView />}
        {sideMenu === GROUPS && <OrganizationView />}
      </FlexRow>
    </Body>
  );
};

export default Home;
