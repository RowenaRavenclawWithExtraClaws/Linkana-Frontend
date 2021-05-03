import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import CustomButton from "../customButton";
import Notify from "../notification";
import { updateStateList } from "../../../helpers/utility";

const AddUserModal = (props) => {
  const addUser = async () => {
    const userData = {
      username: document.getElementById("use1").value,
      password: document.getElementById("pas1").value,
      password_confirm: document.getElementById("pas2").value,
      email: document.getElementById("ema1").value,
      first_name: document.getElementById("fnam1").value,
      last_name: document.getElementById("lnam1").value,
    };

    /*const resObj = await postItem(users, props.token, userData);

    if (resObj.status === 200) {
      Notify("user has been added successfuly", "Congrats", "success");
      props.setUsers(updateStateList(props.Groups, resObj.body));
      props.toggle();
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");*/

    props.setUsers(updateStateList(props.Users, userData));
    props.toggle();
    Notify("user has been added successfuly", "Congrats", "success");
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
          <h5>Add new user</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Label>Username</Label>
            <Input type="username" name="username" id="use1" />
            <br></br>
            <Label>Password</Label>
            <Input type="password" name="password" id="pas1" />
            <br></br>
            <Label>Confirm password</Label>
            <Input type="password" name="password" id="pas2" />
            <br></br>
            <Label>Email</Label>
            <Input type="email" name="password" id="ema1" />
            <br></br>
            <Label>First name</Label>
            <Input type="text" name="password" id="fnam1" />
            <br></br>
            <Label>Last name</Label>
            <Input type="text" name="password" id="lnam1" />
          </Col>
        </Row>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={addUser}
          text="Add"
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

AddUserModal.protoTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
  Users: PropTypes.array,
  setUsers: PropTypes.func,
};

export default AddUserModal;
