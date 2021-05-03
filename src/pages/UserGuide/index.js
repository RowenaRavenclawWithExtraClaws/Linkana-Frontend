import React from "react";
import { Container, Col, Row, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Support from "./Support/Support";

const UserGuide = () => (
  <div className="page-content round-margin">
    <Container fluid>
      <Breadcrumbs
        breadcrumbItem="User Guide"
        purpose="a quick guide to start doing great things with the dashboard"
      />
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <Support></Support>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default UserGuide;
