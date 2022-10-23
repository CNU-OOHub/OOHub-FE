import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import FlexColumn from "../molecules/flexColumn";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/text";
import theme from "../../styles/theme";

const Logo = styled.img`
  width: 7rem;
  align: left;
`;

const Monitoring = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: "92vh" }}>
        <div style={{ padding: 30}}>
        <Text fontSize='1.7' fontWeight='bold'> > Resource Monitoring For admin</Text>
        </div>
    
    </div>
  );
};

export default Monitoring;
