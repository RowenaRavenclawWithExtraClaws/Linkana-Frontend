import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, FormGroup } from "reactstrap";

const LineChart = (props) => {
  return (
    <Card>
      <CardBody style={{ height: props.cardHeight }}>
        <h5 className="inline">{props.title}</h5>
        <FormGroup className="chart-dropdown">
          <select
            id="drop1"
            className="custom-select"
            onChange={(ev) => props.onTimeFrameChange(ev)}
          >
            {props.timeOptions.map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>
        </FormGroup>
        {props.resourceOptions.length ? (
          <FormGroup className="but-div">
            <select
              id="drop2"
              className="custom-select"
              onChange={(ev) => props.onResourceChange(ev)}
            >
              {props.resourceOptions.map((val) => (
                <option key={val}>{val}</option>
              ))}
            </select>
          </FormGroup>
        ) : null}
        <div id={props.canvasID}></div>
      </CardBody>
    </Card>
  );
};

LineChart.propTypes = {
  title: PropTypes.string,
  canvasID: PropTypes.string,
  cardHeight: PropTypes.number,
  timeOptions: PropTypes.array,
  resourceOptions: PropTypes.array,
  onTimeFrameChange: PropTypes.func,
  onResourceChange: PropTypes.func,
};

export default LineChart;
