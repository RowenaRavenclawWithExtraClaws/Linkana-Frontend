import React from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DevicesTable from "./Devices/DevicesTable";

const RemoteControl = () => {
  const token = localStorage.getItem("authUser");

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Remote control"
          purpose="view devices eligible for the remote control feature and accessing linux-based device via a rich terminal interface"
        ></Breadcrumbs>
        <Card>
          <CardBody>{<DevicesTable token={token} />}</CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default RemoteControl;
