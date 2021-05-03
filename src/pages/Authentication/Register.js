import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import CustomButton from "../../components/Common/customButton";
import { AuthFooter } from "../../helpers/utility";
import CarouselPage from "./CarouselPage";
import VerifyEmail from "./VerifyEmail";

const Register = () => {
  const [registed] = useState(false);

  const email = useRef(""); // temporary store for email value to be passed to the SuccessRegister component as a prop

  /*const registerUser = async () => {
    let info = {
      username: document.getElementById("username").value,
      email: document.getElementById("useremail").value,
      password: document.getElementById("userpassword").value,
      password_confirm: document.getElementById("confpass").value,
      first_name: "d",
      last_name: "d",
    };

    email.current = info.email;

    const resObj = await postNoAuthReqItem(register, info);

    if (resObj.status === HTTPSTATUS.success) {
      setRegistered(true);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };*/

  if (registed) return <VerifyEmail email={email.current} />;

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
                        <h5 className="text-primary">Register account</h5>
                        <p className="text-muted">
                          Get your free linkana account now.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form action="dashboard">
                          <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Enter username"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label for="useremail">Email</Label>
                            <Input
                              type="email"
                              className="form-control"
                              id="useremail"
                              placeholder="Enter email"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label for="userpassword">Password</Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label for="confpass">Confirm password</Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="confpass"
                              placeholder="Confirm password"
                            />
                          </FormGroup>

                          <div>
                            <p className="mb-0">
                              By registering you agree to the Linkana{" "}
                              <a
                                href="https://linkana.de/en/privacy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary"
                              >
                                Privacy policy
                              </a>
                            </p>
                          </div>

                          <div className="mt-4">
                            <CustomButton
                              extraStyleClass="btn-block"
                              handler={() => {}}
                              text={"Register"}
                            ></CustomButton>
                          </div>
                        </Form>

                        <div className="mt-5 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="login"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
                          </p>
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

export default Register;
