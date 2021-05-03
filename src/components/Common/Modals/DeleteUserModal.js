import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CustomButton from "../customButton";
import { updateStateList } from "../../../helpers/utility";
import Notify from "../notification";

const DeleteUserModal = (props) => {
  const deleteUser = async () => {
    /*const status = await deleteItem(users, props.token, props.selectedUser.id);

    if (status === HTTPSTATUS.noContentSuccess) {
      Notify("user has been deleted successfuly", "Congrats", "success");
      props.setUsers(
        updateStateList(props.Users, props.selectedUser, "remove")
      );
    } else
      Notify(
        prettifyJsonStr(
          "user cannot be deleted, try to contact your company to see if there is an issue"
        ),
        "Error",
        "error"
      );*/

    props.setUsers(updateStateList(props.Users, props.selectedUser, "remove"));
    Notify("user has been deleted successfuly", "Congrats", "success");
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
          <h5>{`Delete user ${props.selectedUser.username}`}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <h5>Are you sure you want to delete this users ?</h5>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={() => {
            deleteUser();
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

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  selectedUser: PropTypes.object,
  token: PropTypes.string,
  Users: PropTypes.array,
  setUsers: PropTypes.func,
};

export default DeleteUserModal;
