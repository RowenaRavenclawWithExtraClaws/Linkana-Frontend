import React, { useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { SearchField, VerticalSpace } from "../../helpers/utility";
import DevicesTable from "./Devices/DevicesTable";

const MonitoringDevices = () => {
  // passed search word state
  const [searchWord, setSearchWord] = useState(null);

  const token = localStorage.getItem("authUser");

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Resource monitoring"
          purpose="view devices eligible for the monitoring feature and accessing device metrics"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <SearchField
              field="label"
              setSearchWord={setSearchWord}
            ></SearchField>
            <VerticalSpace></VerticalSpace>
            <DevicesTable token={token} searchWord={searchWord} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default MonitoringDevices;
