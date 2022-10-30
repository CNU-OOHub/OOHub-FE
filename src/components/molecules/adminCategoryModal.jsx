import React from "react";
import ReactDOM from "react-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { adminPageState } from "../../atom";
import {
  AUTHORIZATION_AREA,
  CHANGE_PASSWORD,
  RESOURCE_MONITORING,
} from "../../constants";
import theme from "../../styles/theme";
import Text from "../atoms/text";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0;
  top: 8.15vh;
  background-color: ${theme.greyColor};
  border: 1px solid grey;
  z-index: 10000;
`;

const Table = styled.table`
  width: 10rem;
  height: 10rem;
`;

const TableRow = styled.tr`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;

const TableData = styled.td`
  text-align: center;
  vertical-align: middle;
`;

const AdminCategoryModal = () => {
  const [adminPage, setAdminPage] = useRecoilState(adminPageState);
  return ReactDOM.createPortal(
    <Container>
      <Table>
        <tbody>
          <TableRow>
            <TableData>
              <Text
                color={theme.textGreyColor}
                fontSize={1.0}
                onClick={() => {
                  setAdminPage({
                    pageName: AUTHORIZATION_AREA,
                    visible: true,
                  });
                }}
              >
                Authorization Area
              </Text>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <Text
                color={theme.textGreyColor}
                fontSize={1.0}
                onClick={() => {
                  setAdminPage({
                    pageName: CHANGE_PASSWORD,
                    visible: true,
                  });
                }}
              >
                Change Password
              </Text>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <Text
                color={theme.textGreyColor}
                fontSize={1.0}
                onClick={() => {
                  setAdminPage({
                    pageName: RESOURCE_MONITORING,
                    visible: true,
                  });
                }}
              >
                Resource Monitoring
              </Text>
            </TableData>
          </TableRow>
        </tbody>
      </Table>
    </Container>,
    document.getElementById("modal-root")
  );
};

export default AdminCategoryModal;
