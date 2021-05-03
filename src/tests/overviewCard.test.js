import React from "react";
import { render } from "@testing-library/react";
import OverviewCard from "../components/Common/Cards/OverviewCard";

describe("Overview card test suite", () => {
  test("render login page", () => {
    const { getByText } = render(
      <OverviewCard
        height={5}
        color={""}
        invertedColor={""}
        title="overview card"
        noDataMessage=""
        items={[]}
        titles={[]}
        badges={[]}
        changeColorHandler={() => {}}
        formatLast={() => {}}
      />
    );

    const welcomeText = getByText("overview card");

    expect(welcomeText).toBeInTheDocument();
  });
});
