import React, { useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { SearchField, VerticalSpace } from "../../../helpers/utility";
import DevicesTab from "../Tabs/DevicesTab";

const Devices = () => {
  // passed search word state
  const [searchWord, setSearchWord] = useState(null);

  const token = localStorage.getItem("authUser");

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Control devices"
          purpose="send bash commands to linux-based devices"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <SearchField
              field="label"
              setSearchWord={setSearchWord}
            ></SearchField>
            <VerticalSpace></VerticalSpace>
            <DevicesTab token={token} searchWord={searchWord} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Devices;
