import React, { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useGlobal } from "../../providers/GlobalProvider";

interface MasterPageProps {
  children: React.ReactNode;
}

const MasterPage: FC<MasterPageProps> = ({ children }) => {
  const { isOpenMenu } = useGlobal();

  return (
    <div className={`wrapper ${!isOpenMenu ? "sidebar_minimize" : ""}`}>
      <div className="main-panel">
        <Navbar />
        <Sidebar />

        <Container>
          <div className="page-inner">
            <Row>
              <Col md={12}>{children}</Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MasterPage;
