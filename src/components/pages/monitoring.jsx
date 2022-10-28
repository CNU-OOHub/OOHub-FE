import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/text";
import theme from "../../styles/theme";
import { useGetResources , useWorkspaceUsage } from "../../api";
import { useEffect, useState } from "react";


const Mdiv = styled.div`
  width: ${(props) => `${props.width}%`};
  height: 30px;
  background-color: ${theme.primaryColor};
  margin-left: 50px;
  margin-right: 20px;
  border: 1.5px solid black;
`;

const Monitoring = () => {

  const { data: resources } = useGetResources();
  const { data: workspaceUsage } = useWorkspaceUsage();

  console.log("resouce:"+JSON.stringify(resources));
  console.log("workspaceUsage:"+JSON.stringify(workspaceUsage));

  
  return (
    (typeof resources !== "undefined")&& (typeof workspaceUsage !== "undefined") ? (<div style={{ height: "92vh" }}>
    <div style={{ paddingTop: 50, paddingLeft:50, paddingBottom:10}}>
    <Text fontSize='1.7' fontWeight='bold'> {'>'} Resource Monitoring For admin</Text>
    </div>
    <div style={{marginLeft:"5vh", width: '100%'}}>
      <div style={{ margin: 70, paddingLeft: 60, display: 'flex'}}>
      <Text fontSize='1.5'> CPU </Text>
      <Mdiv width={resources.data.cpuUsagePercent}></Mdiv>
      <Text fontSize='1.5'> {resources.data.cpuUsagePercent}% </Text>
      </div >
      <div style={{ margin: 70, paddingLeft: 60, display: 'flex' }}>
      <Text fontSize='1.5'> GPU </Text>
      <Mdiv width='0'></Mdiv>
      <Text fontSize='1.5'> 0.00% </Text>
      </div>
      <div style={{ margin: 70, paddingLeft: 60, display: 'flex' }}>
      <Text fontSize='1.5'> RAM </Text>
      <Mdiv width={resources.data.usedRamUsage}> </Mdiv>
      <Text fontSize='1.5'> {resources.data.usedRamUsage } Mib </Text>
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
