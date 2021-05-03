import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import CustomButton from "../../components/Common/customButton";
import { AuthFooter } from "../../helpers/utility";

import CarouselPage from "./CarouselPage";

const ForgetPassword = () => {
  /*const sendResetLink = async () => {
    const email = document.getElementById("useremail").value;

    const resObj = await postNoAuthReqItem(reset, { email: email });

    if (resObj.status === HTTPSTATUS.ok)
      Notify(
        "reset password link has been sent to the your email",
        "Confirmation",
        "success"
      );
    else Notify(prettifyJsonStr(JSON.stringify(resObj)), "Error", "error");
  };*/

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
                      <div>
                        <h5 className="text-primary"> Reset Password</h5>
                        <p className="text-muted">Re-Password with linkana.</p>
                      </div>

                      <div className="mt-4">
                        <div
                          className="alert alert-success text-center mb-4"
                          role="alert"
                        >
                          Enter your Email and instructions will be sent to you!
                        </div>
                        <Form action="dashboard">
                          <FormGroup>
                            <Label for="useremail">Email</Label>
                            <Input
                              type="email"
                              className="form-control"
                              id="useremail"
                              placeholder="Enter email"
                            />
                          </FormGroup>

                          <FormGroup className="row mb-0">
                            <Col xs={12} className="text-right">
                              <CustomButton
                                text="Reset"
                                handler={() => {}}
                              ></CustomButton>
                            </Col>
                          </FormGroup>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            Remember It ?{" "}
                            <Link
                              to="login"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Sign In here
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <AuthFooter></AuthFooter>
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

export default ForgetPassword;
