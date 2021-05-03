import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import CompanyInfo from "../Components/CompanyInfo";

const CompanyTab = (props) => {
  return (
    <Card>
      <div className="setting-card-title">
        <CardTitle className="font-size-16 font-weight-medium">
          Company information
        </CardTitle>
        <CardSubtitle className="mb-3">
          edit company information below
        </CardSubtitle>
      </div>
      <CardBody>
        <CompanyInfo Company={props.Company} token={props.token}></CompanyInfo>
      </CardBody>
    </Card>
  );
};

export default CompanyTab;
