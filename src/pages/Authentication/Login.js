import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap";

import CarouselPage from "./CarouselPage";
import ROUTES from "../../helpers/routes_helper";
import { AuthFooter } from "../../helpers/utility";
import CustomButton from "../../components/Common/customButton";

const Login = (props) => {
  const [isAuthed] = useState(false);

  //authUser(token).then((res) => toggleAuthed(res));

  // take user's credentials and try to login
  /*const loginUser = async () => {
    const reqBody = {
      username: document.getElementById("username").value,
      password: document.getElementById("userpassword").value,
    };

    const res = await post(auth, reqBody, {
      "Content-Type": "application/json",
    });

    const resBody = await res.json();

    if (res.status === HTTPSTATUS.ok) {
      localStorage.setItem("authUser", code.encryptMessage(resBody.token)); // store encrypted api token
      localStorage.setItem("username", reqBody.username);

      props.toggleAuthed(true);
      toggleAuthed(true);
    } else {
      Notify(prettifyJsonStr(JSON.stringify(resBody)), "Error", "error");
    }
  };*/

  // prevent accessing the login page when a user is logged in
  if (isAuthed) return <Redirect to={ROUTES.overview} />;

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
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to linkana.</p>
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
                            <div className="float-right">
                              <Link to="forgot-password" className="text-muted">
                                Forgot password?
                              </Link>
                            </div>
                            <Label for="userpassword">Password</Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                            />
                          </FormGroup>

                          <div className="custom-control custom-checkbox">
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id="auth-remember-check"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="auth-remember-check"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="mt-3">
                            <Link to={ROUTES.overview}>
                              <CustomButton
                                extraStyleClass="btn-block"
                                handler={() => {}}
                                text={"Log In"}
                              ></CustomButton>
                            </Link>
                          </div>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account ?{" "}
                            <Link
                              to="register"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Signup now{" "}
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

export default Login;
