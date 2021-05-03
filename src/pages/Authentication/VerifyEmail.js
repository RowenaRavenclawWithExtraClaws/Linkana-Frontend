import React from "react";
import CarouselPage from "./CarouselPage";

import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { AuthFooter } from "../../helpers/utility";

const VerifyEmail = (props) => {
  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="row no-gutters">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div className="text-center">
                        <div className="avatar-md mx-auto">
                          <div className="avatar-title rounded-circle bg-light">
                            <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                          </div>
                        </div>
                        <div className="p-2 mt-4">
                          <h4>Success !</h4>
                          <p className="text-muted">
                            An email verification link is sent to your email{" "}
                            <span className="font-weight-semibold">
                              {props.email}
                            </span>
                            . Please verify your email first before login.
                          </p>
                          <div className="mt-4">
                            <Link to="/login" className="btn btn-success">
                              Back to Login
                            </Link>
                          </div>
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

export default VerifyEmail;
