import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteApp } from "../../../redux-utility/Apps/appsSlice";
import CustomButton from "../customButton";
import Notify from "../notification";

const DeleteAppModal = (props) => {
  const dispatch = useDispatch();

  /*const deleteApp = async () => {
    const status = await deleteItem(apps, props.token, props.selectedApp.id);

    if (status === HTTPSTATUS.noContentSuccess) {
      Notify("application has been deleted successfuly", "Congrats", "success");
      props.setApps(updateStateList(props.Apps, props.selectedApp, "remove"));
    } else
      Notify(
        prettifyJsonStr(
          "application cannot be deleted, try to contact your company to see if there is an issue"
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
          <h5>{`Delete app ${props.selectedApp.title}`}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <h5>Are you sure you want to delete this application ?</h5>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={() => {
            dispatch(deleteApp(props.selectedApp.id));
            props.toggle();
            Notify(
              "application has been deleted successfuly",
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

DeleteAppModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  selectedApp: PropTypes.object,
  token: PropTypes.string,
  Apps: PropTypes.array,
  setApps: PropTypes.func,
};

export default DeleteAppModal;
