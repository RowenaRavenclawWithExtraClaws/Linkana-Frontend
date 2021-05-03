import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";
import { groups } from "../../../helpers/endpoints";
import { patchItem } from "../../../helpers/requests_helper";
import Notify from "../notification";
import { prettifyJsonStr, updateStateList } from "../../../helpers/utility";
import CustomButton from "../customButton";

const EditGroupModal = (props) => {
  const editGroup = async () => {
    const groupData = {
      name: document.getElementById("nam1").value,
      description: document.getElementById("dsc1").value,
    };

    const resObj = await patchItem(
      groups,
      props.selectedGroup.id,
      props.token,
      groupData
    );

    if (resObj.status === 200) {
      Notify(
        "group information has been edited successfuly",
        "Congrats",
        "success"
      );
      props.setGroups(updateStateList(props.Groups, resObj.body, "edit"));
      props.toggle();
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
          <h5>Edit group</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Form>
              <Col lg="13">
                <FormGroup>
                  <Label for="nam1">Name</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nam1"
                    defaultValue={props.selectedGroup.name}
                  />
                </FormGroup>
              </Col>
              <Col lg="13">
                <FormGroup>
                  <Label for="dsc1">Description</Label>
                  <textarea
                    className="form-control"
                    rows="2"
                    id="dsc1"
                    defaultValue={props.selectedGroup.description}
                  ></textarea>
                </FormGroup>
              </Col>
            </Form>
          </Col>
        </Row>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={() => editGroup()}
          text="Save changes"
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

EditGroupModal.protoTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
  selectedGroup: PropTypes.object,
  Groups: PropTypes.array,
  setGroups: PropTypes.func,
};

export default EditGroupModal;
