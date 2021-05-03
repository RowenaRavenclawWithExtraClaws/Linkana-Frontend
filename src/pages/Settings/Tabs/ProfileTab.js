import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import ProfileInfo from "../Components/ProfileInfo";
import ProfilePic from "../Components/ProfilePic";

const ProfileTab = (props) => {
  return (
    <Card>
      <div className="setting-card-title">
        <CardTitle className="font-size-16 font-weight-medium">
          Profile information
        </CardTitle>
        <CardSubtitle className="mb-3">
          edit profile information below
        </CardSubtitle>
      </div>
      <CardBody>
        <Row>
          <Col lg="4">
            <ProfilePic token={props.token}></ProfilePic>
          </Col>
          <Col lg="8">
            <ProfileInfo
              Profile={props.Profile}
              token={props.token}
            ></ProfileInfo>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ProfileTab;
