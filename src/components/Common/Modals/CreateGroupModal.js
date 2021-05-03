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
import { postItem } from "../../../helpers/requests_helper";
import Notify from "../notification";
import { prettifyJsonStr, updateStateList } from "../../../helpers/utility";
import CustomButton from "../customButton";

const CreateGroupModal = (props) => {
  const createGroup = async () => {
    const groupData = {
      name: document.getElementById("nam1").value,
      description: document.getElementById("dsc1").value,
    };

    const resObj = await postItem(groups, props.token, groupData);

    if (resObj.status === 200) {
      Notify("group has been created successfuly", "Congrats", "success");
      if (props.setGroups)
        props.setGroups(updateStateList(props.Groups, resObj.body));
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
          <h5>Create new group</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Form>
              <Col lg="13">
                <FormGroup>
                  <Label for="nam1">Name</Label>
                  <Input type="text" className="form-control" id="nam1" />
                </FormGroup>
              </Col>
              <Col lg="13">
                <FormGroup>
                  <Label for="dsc1">Description</Label>
                  <textarea
                    className="form-control"
                    rows="2"
                    id="dsc1"
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
          handler={() => createGroup()}
          text="Create group"
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

CreateGroupModal.protoTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
  setGroups: PropTypes.func,
};

export default CreateGroupModal;
