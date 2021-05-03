import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import CustomButton from "../customButton";

const ResetLayoutModal = (
  props = {
    isOpen: false,
    toggle: () => {},
    okHandler: () => {},
  }
) => (
  <Modal isOpen={props.isOpen} autoFocus={true} toggle={props.toggle}>
    <ModalBody
      style={{
        textAlign: "center",
      }}
    >
      <h5>Are you sure you want to reset your layout?</h5>
      <br />
      <CustomButton
        display="inline-block"
        margin={10}
        text="Cancel"
        handler={props.toggle}
      ></CustomButton>
      <CustomButton
        display="inline-block"
        margin={10}
        text="Ok"
        handler={props.okHandler}
      ></CustomButton>
    </ModalBody>
  </Modal>
);

ResetLayoutModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  okHandler: PropTypes.func,
};

export default ResetLayoutModal;
