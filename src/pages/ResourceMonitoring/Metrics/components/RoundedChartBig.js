import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody } from "reactstrap";

const RoundedChartBig = (props) => (
  <Card>
    <CardBody className="align-center">
      <div id={props.id}></div>
      <h5>{props.text}</h5>
    </CardBody>
  </Card>
);

RoundedChartBig.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
};

export default RoundedChartBig;
