import React from "react";
import Tour from "reactour";
import { navArrow } from "../../../helpers/utility";
import { steps } from "./steps";

export default function DashTour(
  props = { isOpen: false, route: "overview", onClose: () => {} }
) {
  const noSteps = [
    {
      content: "Oops! There is no tour available for this page",
    },
  ];

  const tourSteps = steps[props.route] ? steps[props.route] : noSteps;

  return (
    <Tour
      steps={tourSteps}
      isOpen={props.isOpen}
      disableInteraction={true}
      showCloseButton={false}
      showNavigation={false}
      nextButton={navArrow()}
      prevButton={navArrow("left")}
      badgeContent={(curr, tot) => `${curr} of ${tot}`}
      onRequestClose={props.onClose}
    />
  );
}
