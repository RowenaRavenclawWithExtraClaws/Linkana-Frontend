import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Authentication/Register";

describe("Register page test suite", () => {
  test("render login page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const welcomeText = getByText("Register account");

    expect(welcomeText).toBeInTheDocument();
  });
});
