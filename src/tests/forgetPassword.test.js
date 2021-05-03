import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgetPassword from "../pages/Authentication/ForgetPassword";

describe("Forget password page test suite", () => {
  test("render login page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ForgetPassword />
      </BrowserRouter>
    );

    const welcomeText = getByText("Re-Password with linkana.");

    expect(welcomeText).toBeInTheDocument();
  });
});
