import React from "react";
import PropTypes from "prop-types";
import { IconPicker } from "react-fa-icon-picker";

const CustomIconPicker = (props) => (
  <IconPicker
    value={props.icon}
    onChange={(newIcon) => props.setIcon(newIcon)}
    buttonStyles={{
      border: "1px solid",
      borderColor: "#2a3042",
    }}
    buttonIconStyles={{
      color: props.color,
    }}
    containerStyles={{
      backgroundColor: "#2a3042",
    }}
    searchInputStyles={{
      backgroundColor: "#2a3042",
      border: "1px solid",
      borderColor: "#2a3042",
      color: "white",
    }}
    pickerIconStyles={{
      color: "#A6B0CF",
    }}
  ></IconPicker>
);

CustomIconPicker.protoTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  setIcon: PropTypes.func,
};

export default CustomIconPicker;
