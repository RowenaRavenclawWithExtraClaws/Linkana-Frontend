import React, { useState } from "react";
import ICONS from "./icons";

const CustomButton = (
  props = {
    id: "",
    keyy: "",
    type: "submit",
    title: "",
    inline: "",
    float: "",
    margin: 0,
    marginTop: 0,
    extraStyleClass: "",
    text: "",
    icon: "",
    handler: () => {},
  }
) => {
  const [loading, toggleLoading] = useState(false);

  const isAsync = (func) => func.constructor.name === "AsyncFunction";

  return (
    <button
      id={props.id}
      key={props.keyy}
      type={props.type ? props.type : "button"}
      className={`btn btn-primary font-weight-medium  ${props.extraStyleClass}`}
      title={props.title}
      style={{
        display: props.inline,
        float: props.float,
        marginLeft: props.margin,
        marginTop: props.marginTop,
      }}
      onClick={async () => {
        if (isAsync(props.handler)) {
          toggleLoading(true);
          await props.handler();
          toggleLoading(false);
        } else props.handler();
      }}
    >
      {props.icon}
      {loading ? <i className={`${ICONS.loaderIcon} bx-spin`}></i> : props.text}
    </button>
  );
};

export default CustomButton;
