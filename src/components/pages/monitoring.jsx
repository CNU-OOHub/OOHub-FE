import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/text";
import theme from "../../styles/theme";
import { useWorkspaceUsage } from "../../api";


const Mdiv = styled.div`
  width: 50%;
  height: 40px;
  background-color: ${theme.primaryColor};
  margin-left: 50px;
  margin-right: 20px;
  border: 1.5px solid black;
`;


const Monitoring = () => {

  const { data: usage } = useWorkspaceUsage();

  return (
    <div style={{ height: "92vh" }}>
        <div style={{ paddingTop: 50, paddingLeft:50, paddingBottom:10}}>
        <Text fontSize='1.7' fontWeight='bold'> {'>'} Resource Monitoring For admin</Text>
        </div>
        <div style={{marginLeft:"5vh", width: '100%'}}>
          <div style={{ margin: 70, paddingLeft: 60, display: 'flex'}}>
          <Text fontSize='1.5'> CPU </Text>
          <Mdiv > </Mdiv>
          <Text fontSize='1.5'> 32.45% </Text>
          </div >
          <div style={{ margin: 70, paddingLeft: 60, display: 'flex' }}>
          <Text fontSize='1.5'> GPU </Text>
          <Mdiv > </Mdiv>
          <Text fontSize='1.5'> 05.45% </Text>
          </div>
          <div style={{ margin: 70, paddingLeft: 60, display: 'flex' }}>
          <Text fontSize='1.5'> RAM </Text>
          <Mdiv > </Mdiv>
          <Text fontSize='1.5'> 5.629 Mib </Text>
          </div>
          <div style={{ textAlign: 'center',justifyContent: 'space-between', paddingTop: 20 }}>
          <Text fontSize='2' fontWeight="40"> 사용한 공간 </Text>
          <Text fontSize='2' marginLeft="40" fontWeight="700" color="red"> &nbsp; {usage} bytes </Text>
          </div>
        </div>
    </div>
  );
};

export default Monitoring;
