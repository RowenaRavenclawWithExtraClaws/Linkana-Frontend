import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Media } from "reactstrap";

const MetricsInfoCard = (props) => (
  <Card className="mini-stats-wid">
    <CardBody style={{ height: props.cardHeight }}>
      {!props.data ? (
        <div className="font-size-15 align-center">
          No {props.title} data available
        </div>
      ) : (
        <Media>
          <Media body>
            <h5 className="font-weight-medium">{props.title}</h5>
            <h5 className="mb-0">{props.value}</h5>
          </Media>
          <div className="mini-stat-icon avatar-sm rounded-circle">
            <span className="avatar-title">
              <i className={`${props.icon} fa-2x`}></i>
            </span>
          </div>
        </Media>
      )}
    </CardBody>
  </Card>
);

MetricsInfoCard.propTypes = {
  cardHeight: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
};

export default MetricsInfoCard;
