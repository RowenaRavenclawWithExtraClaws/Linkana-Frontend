import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CustomButton from "../customButton";
import {
  HTTPSTATUS,
  prettifyJsonStr,
  updateStateList,
} from "../../../helpers/utility";
import { deleteItem } from "../../../helpers/requests_helper";
import { groups } from "../../../helpers/endpoints";
import Notify from "../notification";

const DeleteGroupModal = (props) => {
  const deleteGroup = async () => {
    const status = await deleteItem(
      groups,
      props.token,
      props.selectedGroup.id
    );

    if (status === HTTPSTATUS.noContentSuccess) {
      Notify("group has been deleted successfuly", "Congrats", "success");
      props.setGroups(
        updateStateList(props.Groups, props.selectedGroup, "remove")
      );
    } else
      Notify(
        prettifyJsonStr(
          "group cannot be deleted, try to contact your company to see if there is an issue"
        ),
        "Error",
        "error"
      );
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
          <h5>{`Delete group ${props.selectedGroup.name}`}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <h5>Are you sure you want to delete this group ?</h5>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={() => {
            deleteGroup();
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

DeleteGroupModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  selectedGroup: PropTypes.object,
  token: PropTypes.string,
  Groups: PropTypes.array,
  setGroups: PropTypes.func,
};

export default DeleteGroupModal;
