import styled from "styled-components";
import Text from "../atoms/text";
import theme from "../../styles/theme";
import { useGetResources, useWorkspaceUsage } from "../../api";
import { useNavigate } from "react-router-dom";
import { adminPageState } from "../../atom";
import { RESOURCE_MONITORING } from "../../constants";
import React from "react";
import ReactLoading from "react-loading";
import { useRecoilState } from "recoil";

const Frame = styled.div`
  width: 960px;
  height: 50px;
  background-color: white;
  margin-left: 50px;
  margin-right: 30px;
  border: 1px solid black;
  background-color: ${theme.blackGreyColor};
`;

const Mdiv = styled.div`
  width: ${(props) => `${Number(props.width)}%`};
  height: 48px;
  background-color: ${theme.primaryColor};
  float: left;
`;

const Monitoring = () => {
  const { data: resources, isLoading: getResourcesIsLoading } =
    useGetResources();
  const { data: workspaceUsage, isLoading: workspaceIsLoading } =
    useWorkspaceUsage();

  console.log("resouce:" + JSON.stringify(resources));
  console.log("workspaceUsage:" + JSON.stringify(workspaceUsage));

  let navigate = useNavigate();
  const routeChange = () => {
    navigate(-1);
  };

  const [adminPage, setAdminPage] = useRecoilState(adminPageState);

  return !getResourcesIsLoading && !workspaceIsLoading ? (
    <div style={{ height: "92vh", backgroundColor: theme.darkGreyColor }}>
      <div
        style={{ paddingTop: 50, paddingLeft: 50, cursor: "pointer" }}
        onClick={() => {
          setAdminPage({
            pageName: RESOURCE_MONITORING,
            visible: false,
          });
          routeChange();
        }}
      >
        <Text fontSize={2} fontWeight="bold" color="white">
          {"<"} Resource Monitoring
        </Text>
      </div>
      <div style={{ marginLeft: "5vh", width: "100%" }}>
        <div
          style={{
            margin: 70,
            paddingLeft: 60,
            display: "flex",
            justifyItems: "center",
          }}
        >
          <Text fontSize={1.7} color="white">
            CPU
          </Text>
          <Frame>
            <Mdiv width={resources.data.cpuUsagePercent}></Mdiv>
          </Frame>
          <Text fontSize={1.7} color="white">
            {resources.data.cpuUsagePercent}%
          </Text>
        </div>

        <div style={{ margin: 70, paddingLeft: 60, display: "flex" }}>
          <Text fontSize={1.7} color="white">
            GPU
          </Text>
          <Frame>
            <Mdiv width="0"></Mdiv>
          </Frame>
          <Text fontSize={1.7} color="white">
            0.00%
          </Text>
        </div>
        <div style={{ margin: 70, paddingLeft: 60, display: "flex" }}>
          <Text fontSize={1.7} color="white">
            RAM
          </Text>
          <Frame>
            <Mdiv
              width={
                Number(resources.data.totalRamUsage.slice(0, -2) * 1000) /
                Number(resources.data.usedRamUsage.slice(0, -2))
              }
            ></Mdiv>
          </Frame>
          <Text fontSize={1.7} color="white">
            {resources.data.usedRamUsage}
          </Text>
        </div>
        <div
          style={{
            textAlign: "center",
            justifyContent: "space-between",
            paddingTop: 20,
          }}
        >
          <Text fontSize={2} fontWeight="40" color="white">
            사용한 공간
          </Text>
          <Text fontSize={2} marginLeft="40" fontWeight="700" color="red">
            &nbsp; {workspaceUsage.usage} bytes
          </Text>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        backgroundColor: theme.darkGreyColor,
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="spokes" color="white" height={"10%"} width={"10%"} />
    </div>
  );
};

export default Monitoring;
