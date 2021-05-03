import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteCommand } from "../../../redux-utility/Commands/commandsSlice";
import CustomButton from "../customButton";
import Notify from "../notification";

const DeleteCommandModal = (props) => {
  const dispatch = useDispatch();

  /*const deleteCommand = async () => {
    const status = await deleteItem(
      commands,
      props.token,
      props.selectedCommand.id
    );

    if (status === HTTPSTATUS.noContentSuccess) {
      Notify("command has been deleted successfuly", "Congrats", "success");
      props.setCommands(
        updateStateList(props.Commands, props.selectedCommand, "remove")
      );
    } else
      Notify(
        prettifyJsonStr(
          "command cannot be deleted, try to contact your company to see if there is an issue"
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
          <h5>{`Delete command ${props.selectedCommand.title}`}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <h5>Are you sure you want to delete this command ?</h5>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={() => {
            dispatch(deleteCommand(props.selectedCommand.id));
            props.toggle();
            Notify(
              "command has been deleted successfuly",
              "Congrats",
              "success"
            );
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

DeleteCommandModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  selectedCommand: PropTypes.object,
  token: PropTypes.string,
  Commands: PropTypes.array,
  setCommands: PropTypes.func,
};

export default DeleteCommandModal;
