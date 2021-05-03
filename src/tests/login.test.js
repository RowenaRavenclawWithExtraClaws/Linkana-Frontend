import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Authentication/Login";

describe("Login page test suite", () => {
  test("render login page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const welcomeText = getByText("Welcome Back !");

    expect(welcomeText).toBeInTheDocument();
  });
});
