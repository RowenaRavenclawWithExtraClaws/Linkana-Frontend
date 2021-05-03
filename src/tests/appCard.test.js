import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppCard from "../components/Common/Cards/AppCard";

describe("Application card test suite", () => {
  test("render login page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <AppCard
          app={{ title: "app1" }}
          linkHandler={() => {}}
          deleteHandler={() => {}}
          enableDisableHandler={() => {}}
          editHandler={() => {}}
        />
      </BrowserRouter>
    );

    const welcomeText = getByText("app1");

    expect(welcomeText).toBeInTheDocument();
  });
});
