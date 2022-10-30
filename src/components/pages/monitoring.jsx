import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/text";
import theme from "../../styles/theme";
import { useGetResources , useWorkspaceUsage } from "../../api";
import { useEffect, useState } from "react";

const Frame = styled.div`
  width: 960px;
  height: 50px;
  background-color: white;
  margin-left: 50px;
  margin-right: 30px;
  border: 1px solid black;
`;

const Mdiv = styled.div`
  width: ${(props) => `${Number(props.width)}%`};
  height: 48px;
  background-color: ${theme.primaryColor};
  float: left;
`;

const Monitoring = () => {

  const { data: resources } = useGetResources();
  const { data: workspaceUsage } = useWorkspaceUsage();

  console.log("resouce:"+JSON.stringify(resources));
  console.log("workspaceUsage:"+JSON.stringify(workspaceUsage));

  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    navigate(-1);
  }

  return (
    (typeof resources !== "undefined")&& (typeof workspaceUsage !== "undefined") ? (<div style={{ height: "92vh" }}>
    <div style={{ paddingTop: 50, paddingLeft:50, cursor:"pointer"}} onClick={routeChange}>
    <Text fontSize='2' fontWeight='bold'> {'<'} Resource Monitoring For admin</Text>
    </div>
    <div style={{marginLeft:"5vh", width: '100%'}}>
      <div style={{ margin: 70, paddingLeft: 60, display: 'flex', justifyItems: 'centers'}}>
      <Text fontSize='1.7'> CPU </Text>
      <Frame><Mdiv width={resources.data.cpuUsagePercent}></Mdiv></Frame>
      <Text fontSize='1.7'> {resources.data.cpuUsagePercent}% </Text>
      </div >

      <div style={{ margin: 70, paddingLeft: 60, display: 'flex' }}>
      <Text fontSize='1.7'> GPU </Text>
      <Frame><Mdiv width='0'></Mdiv></Frame>
      <Text fontSize='1.7'> 0.00% </Text>
      </div>
      <div style={{ margin: 70, paddingLeft: 60, display: 'flex' }}>
      <Text fontSize='1.7'> RAM </Text>
      <Frame><Mdiv width={resources.data.usedRamUsage}> </Mdiv></Frame>
      <Text fontSize='1.7'> {resources.data.usedRamUsage } Mib </Text>
      </div>
      <div style={{ textAlign: 'center',justifyContent: 'space-between', paddingTop: 20 }}>
      <Text fontSize='2' fontWeight="40"> 사용한 공간 </Text>
      <Text fontSize='2' marginLeft="40" fontWeight="700" color="red"> &nbsp; {workspaceUsage.usage} bytes </Text>
      </div>
    </div>
</div>):(
  <div>Loading...</div>
)
    
  );
};

export default Monitoring;
