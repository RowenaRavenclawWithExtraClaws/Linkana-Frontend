import React, { useState } from "react";
import { Col, Card, CardBody, Row } from "reactstrap";
import Collapsible from "react-collapsible";
import { docSite } from "../../../helpers/endpoints";
import { COLORS } from "../../../helpers/utility";

const Support = () => {
  const [arrowAngle, setArrowAngle] = useState(true);
  const [arrowAngle1, setArrowAngle1] = useState(true);
  const [arrowAngle2, setArrowAngle2] = useState(true);

  const cardHeight = 161;

  return (
    <React.Fragment>
      <Row>
        <Col xl="6" sm="6">
          <Card style={{ backgroundColor: COLORS.darker }}>
            <div className="px-4 py-3">
              <h4 className="font-size-16 font-weight-medium">FAQ</h4>
            </div>
            <CardBody>
              <Collapsible
                className="collap"
                trigger={
                  <React.Fragment>
                    <h4
                      className="font-size-16 font-weight-medium cursor-pointer inline"
                      onClick={() => setArrowAngle(!arrowAngle)}
                    >
                      What do you see in the dashboard?
                    </h4>
                    <i
                      className={`breadcrumb-action ${
                        arrowAngle ? "fas fa-angle-down" : "fas fa-angle-up"
                      }`}
                      onClick={() => setArrowAngle(!arrowAngle)}
                    ></i>
                  </React.Fragment>
                }
              >
                <p className="font-size-15">
                  On the left side you can see the last audio files that were
                  sent by the devices. On the right sees you can get some
                  statistics, for example how many devices are currently are
                  online. How many audio files have not yet been edited were.
                  And how many audio files processed in total were. And a
                  statistic of how many audio files are inside Ran for 24 hours.
                </p>
                <p className="font-size-15">
                  On the left, where the last audio files are, there land all
                  the audio files recorded by the devices were. Here you can
                  listen to it and confirm it, should it Transaction have been
                  correct. Otherwise you can use the Change audio files directly
                  there and then confirm.
                </p>
                <p className="font-size-15">
                  This change in transcription is recorded in a database saved.
                  So later the audio files that are corrupted are used again for
                  training purposes.
                </p>
              </Collapsible>
              <br></br>
              <Collapsible
                className="collap"
                trigger={
                  <React.Fragment>
                    <h4
                      className="font-size-16 font-weight-medium cursor-pointer inline"
                      onClick={() => setArrowAngle1(!arrowAngle1)}
                    >
                      What do you see in the devices?
                    </h4>
                    <i
                      className={`breadcrumb-action ${
                        arrowAngle ? "fas fa-angle-down" : "fas fa-angle-up"
                      }`}
                      onClick={() => setArrowAngle1(!arrowAngle1)}
                    ></i>
                  </React.Fragment>
                }
              >
                <p className="font-size-15">
                  All devices and the current one are displayed in the “Device”
                  State of the devices, whether they are on or off or possibly
                  have a fault.
                </p>
                <p className="font-size-15">
                  On the left the ID and the status. Green means online, gray
                  means offline and red means one Error occurred.
                </p>
                <p className="font-size-15">
                  You can designate devices in the “Label”. “Hostname” - is that
                  Recognition network With “Owner” the owner becomes the owner
                  specified. Should you have several companies or several If you
                  have customers with whom the device is located, this will be
                  the one Owner shown. “Provider” - this is where the audio
                  files are transcribed.
                </p>
              </Collapsible>
              <br></br>
              <Collapsible
                className="collap"
                trigger={
                  <React.Fragment>
                    <h4
                      className="font-size-16 font-weight-medium cursor-pointer inline"
                      onClick={() => setArrowAngle2(!arrowAngle2)}
                    >
                      What do you see in the Apps
                    </h4>
                    <i
                      className={`breadcrumb-action ${
                        arrowAngle ? "fas fa-angle-down" : "fas fa-angle-up"
                      }`}
                      onClick={() => setArrowAngle2(!arrowAngle2)}
                    ></i>
                  </React.Fragment>
                }
              >
                <p className="font-size-15">
                  On the app page you can see those that have already been
                  purchased or pre-installed apps. You can also find new apps
                  that you can use have not yet acquired or are currently under
                  development are. You can order these here with a click of the
                  mouse.
                </p>
              </Collapsible>
            </CardBody>
          </Card>
        </Col>
        <Col xl="6" sm="6">
          <Card style={{ backgroundColor: COLORS.darker }}>
            <div className="px-4 py-3">
              <h4 className="font-size-16 font-weight-medium">SUPPORT</h4>
            </div>
            <CardBody style={{ height: cardHeight }}>
              <h4 className="font-size-16 font-weight-medium">
                24x7 support over email, phone, or chat
              </h4>
              <p className="font-size-15">
                Get in touch with our team—we‘re here to help.
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong className="font-size-16 font-weight-medium">
                    Phone: +201280099665
                  </strong>
                </li>
                <li>
                  <strong className="font-size-16 font-weight-medium">
                    Email: a.nasser@linkana.de
                  </strong>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h4 className="font-size-16 font-weight-medium">
        For more information, feel free to visit our documentation site{" "}
        <a href={docSite} target="_blank" rel="noopener noreferrer">
          here
        </a>
      </h4>
    </React.Fragment>
  );
};

export default Support;
