import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/text";
import theme from "../../styles/theme";
import FlexColumn from "../molecules/flexColumn";
import FlexRow from "../molecules/flexRow";


const Mdiv = styled.div`
  width: 50%;
  height: 40px;
  background-color: ${theme.primaryColor};
  margin-left: 50px;
  margin-right: 20px;
  border: 1.5px solid black;
`;

const Monitoring = () => {

  return (
    <div style={{ height: "92vh" }}>
        <div style={{ paddingTop: 50, paddingLeft:50, paddingBottom:10}}>
        <Text fontSize='1.7' fontWeight='bold'> {'>'} Resource Monitoring For admin</Text>
        </div>
        <div style={{marginLeft:"5vh"}}>
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
          <div style={{ margin: 70, paddingLeft: 60, display: 'flex' }}>
          <Text fontSize='1.5'> 사용한 공간 </Text>
          <Text fontSize='1.5'> 3425 bytes </Text>
          </div>
        </div>
    </div>
  );
};

export default Monitoring;
