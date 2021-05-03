import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import VoiceInput from "./Cards/VoiceInput";

const AITest = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="AI testing"
          purpose="test voice assistants and view latest tests"
        ></Breadcrumbs>
        <VoiceInput></VoiceInput>
      </Container>
    </div>
  );
};

export default AITest;
