import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Notify from "../../../components/Common/notification";
import { types } from "../../../helpers/endpoints";
import { fetchItems } from "../../../helpers/requests_helper";
import { HTTPSTATUS, Loader, prettifyJsonStr } from "../../../helpers/utility";
import DeviceTypesTab from "../Tabs/DeviceTypesTab";

const Types = () => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data states
  const [Types, setTypes] = useState([]);
  // modal states

  const token = localStorage.getItem("authUser");

  const getTypes = async () => {
    const resObj = await fetchItems(types, token);

    if (resObj.status === HTTPSTATUS.ok) {
      setTypes(resObj.body.results);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);
  };

  useEffect(() => {
    getTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Types"
          purpose="view device types information"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <DeviceTypesTab Types={Types} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Types;
