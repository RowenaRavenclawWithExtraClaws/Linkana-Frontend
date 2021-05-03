import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteDevice } from "../../../redux-utility/Devices/devicesSlice";
import CustomButton from "../customButton";
import ICONS from "../icons";
import { COLORS } from "../../../helpers/utility";
import Notify from "../notification";

const DeleteDeviceModal = (props) => {
  const dispatch = useDispatch();

  /*const deleteDevice = () => {
    const status = await deleteItem(devices, props.token, props.device.serial);

    if (status === HTTPSTATUS.noContentSuccess) {
      Notify("device has been deleted successfuly", "Congrats", "success");
      props.setDevices(updateStateList(props.Devices, props.device, "remove"));
    } else
      Notify(
        prettifyJsonStr(
          "device cannot be deleted, try to contact your company to see if there is an issue"
        ),
        "Error",
        "error"
      );
  };*/

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
          <h5>{`Delete Device with serial ${props.device.serial}`}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <h5>Are you sure you want to delete this device ?</h5>
        <p>
          {
            <i
              className={`${ICONS.warning} fa-lg`}
              style={{ color: COLORS.red }}
            ></i>
          }
          {"  "}Warning: All data related to this device will be erased
          completely!
        </p>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={() => {
            dispatch(deleteDevice(props.device.id));
            Notify(
              "device has been deleted successfuly",
              "Congrats",
              "success"
            );
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

DeleteDeviceModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  device: PropTypes.object,
  token: PropTypes.string,
  Devices: PropTypes.array,
  setDevices: PropTypes.func,
};

export default DeleteDeviceModal;
