import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VerifyEmail from "../pages/Authentication/VerifyEmail";

describe("Verify email page test suite", () => {
  test("render login page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <VerifyEmail />
      </BrowserRouter>
    );

    const welcomeText = getByText("Back to Login");

    expect(welcomeText).toBeInTheDocument();
  });
});
