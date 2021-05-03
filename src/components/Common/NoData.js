import React from "react";

// a nice message when there is no data is fetched
const NoData = (props = { message: "", subMessage: "" }) => {
  return (
    <div className="text-center mb-5 no-data-margin">
      <i className="bx bx-error display-3"></i>
      <h4 className="text-uppercase">{props.message}</h4>
      <h5 className="text-uppercase">{props.subMessage}</h5>
    </div>
  );
};

export default NoData;
