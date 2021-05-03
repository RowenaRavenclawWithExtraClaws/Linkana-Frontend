import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Row, Col } from "reactstrap";

export const RoundedChart = (
  props = {
    id1: "",
    id2: "",
    text1: "",
    text2: "",
  }
) => (
  <Card>
    <CardBody>
      <Row>
        <Col xl="6" sm="12" className="align-center">
          <div id={props.id1}></div>
          <h5>{props.text1}</h5>
        </Col>
        <Col xl="6" sm="12" className="align-center">
          <div id={props.id2}></div>
          <h5>{props.text2}</h5>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

RoundedChart.propTypes = {
  id1: PropTypes.string,
  id2: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
};

export default RoundedChart;
