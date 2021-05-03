import React from "react";
import { Col, Container, Row } from "reactstrap";

import {
  AuthFooter,
  COLORS,
  configSiteUrl,
  Counter,
} from "../../helpers/utility";
import CarouselPage from "./CarouselPage";

const ConfirmedEmail = () => {
  setTimeout(() => (window.location.href = configSiteUrl()), 5000);

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="no-gutters">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div className="p-2 mt-4 align-center">
                        <h4 style={{ color: COLORS.green }}>Success !</h4>
                        <p className="font-size-18">
                          Your email has been confirmed successfuly!
                        </p>
                        <p>Redirection to Login page in</p>
                        <div className="mt-4">
                          <Counter></Counter>
                        </div>
                      </div>
                    </div>

                    <AuthFooter />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ConfirmedEmail;
