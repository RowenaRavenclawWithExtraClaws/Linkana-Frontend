import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import CustomButton from "../../components/Common/customButton";
import Notify from "../../components/Common/notification";
import { reset } from "../../helpers/endpoints";
import { postNoAuthReqItem } from "../../helpers/requests_helper";
import {
  AuthFooter,
  Counter,
  HTTPSTATUS,
  prettifyJsonStr,
  validatePasswords,
  configSiteUrl,
} from "../../helpers/utility";
import CarouselPage from "./CarouselPage";

const ResetPassword = () => {
  // change according to a successful password reset
  const [isReset, setReset] = useState(false);

  // parse string for password reset token
  const getResetToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("token");
  };

  const resetPassword = async () => {
    const token = getResetToken();
    const password = document.getElementById("password").value;
    const confpassword = document.getElementById("confpassword").value;

    if (!validatePasswords(password, confpassword))
      Notify(
        "password and confirmation password must be the same!",
        "Passwords not matching",
        "error"
      );
    else {
      const resObj = await postNoAuthReqItem(`${reset}confirm/`, {
        password: password,
        token: token,
      });

      if (resObj.status === HTTPSTATUS.success) {
        setReset(true);
      } else
        Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
    }
  };

  if (isReset) setTimeout(() => (window.location.href = configSiteUrl()), 5000);

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
                      <div className="mt-4">
                        {!isReset ? (
                          <React.Fragment>
                            <div>
                              <h5 className="text-primary">Reset password</h5>
                              <p className="text-muted">
                                Get your free linkana account now.
                              </p>
                            </div>
                            <Form action="dashboard">
                              <FormGroup>
                                <Label for="username">New password</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="password"
                                  placeholder="Enter username"
                                />
                              </FormGroup>

                              <FormGroup>
                                <Label for="useremail">
                                  Confirm new password
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="confpassword"
                                  placeholder="Enter email"
                                />
                              </FormGroup>

                              <div className="mt-4">
                                <CustomButton
                                  extraStyleClass="btn-block"
                                  handler={resetPassword}
                                  text={"Reset"}
                                ></CustomButton>
                              </div>
                            </Form>
                          </React.Fragment>
                        ) : (
                          <div className="align-center">
                            <p className="font-size-18">
                              Your password has been reset successfully!
                            </p>
                            <p className="font-size-15">
                              Redirect to Login page in
                            </p>
                            <Counter></Counter>
                          </div>
                        )}
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

export default ResetPassword;
