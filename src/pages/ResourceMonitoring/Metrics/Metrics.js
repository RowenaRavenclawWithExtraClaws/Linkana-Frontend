import React, { useState } from "react";
import { useParams } from "react-router";
import { Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { ResetLayout } from "../../../helpers/utility";
import MetricsCharts from "./MetricsCharts";

const Metrics = () => {
  const [isResetModalOpen, toggleResetModal] = useState(false);

  const token = localStorage.getItem("authUser");
  const serial = useParams().id;
  const label = localStorage.getItem("label");

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Device Metrics"
          purpose={`serial: ${serial}${
            label.length ? `, label: ${label}` : ""
          }`}
          action={
            <ResetLayout handler={() => toggleResetModal(true)}></ResetLayout>
          }
        ></Breadcrumbs>
        <MetricsCharts
          serial={serial}
          token={token}
          isResetModalOpen={isResetModalOpen}
          toggleResetModal={toggleResetModal}
        />
      </Container>
    </div>
  );
};

export default Metrics;
