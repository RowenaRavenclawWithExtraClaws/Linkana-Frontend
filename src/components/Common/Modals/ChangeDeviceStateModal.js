import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CustomButton from "../customButton";
import {
  HTTPSTATUS,
  prettifyJsonStr,
  updateStateList,
} from "../../../helpers/utility";
import { changeItemState } from "../../../helpers/requests_helper";
import { devices } from "../../../helpers/endpoints";
import Notify from "../notification";

const ChangeDeviceStateModal = (props) => {
  const changeState = async () => {
    const resObj = await changeItemState(
      devices,
      props.token,
      props.device.serial,
      props.enable ? "enable" : "disable"
    );

    if (resObj.status === HTTPSTATUS.success) {
      Notify(
        `device has been ${props.enable ? "enable" : "disable"} successfuly`,
        "Congrats",
        "success"
      );
      props.setDevices(updateStateList(props.Devices, props.device, "remove"));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  return (
    <Modal
      isOpen={props.isOpen}
      role="dialog"
      autoFocus={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={props.toggle}
    >
      <ModalHeader>
        <div>
          <h5>{`${props.enable ? "Enable" : "Disable"} Device with serial ${
            props.device.serial
          }`}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <h5>{`Are you sure you want to ${
          props.enable ? "enable" : "disable"
        } this device ?`}</h5>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={() => {
            changeState();
            props.toggle();
          }}
          text="Ok"
        ></CustomButton>
        <CustomButton
          float="right"
          handler={props.toggle}
          text="Cancel"
        ></CustomButton>
      </ModalBody>
    </Modal>
  );
};

ChangeDeviceStateModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  device: PropTypes.object,
  token: PropTypes.string,
  Devices: PropTypes.array,
  setDevices: PropTypes.func,
};

export default ChangeDeviceStateModal;
