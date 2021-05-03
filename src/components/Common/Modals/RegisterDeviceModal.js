import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";
import {
  getOptions,
  slugify,
  commandText,
  copyCommand,
} from "../../../helpers/utility";
import Notify from "../notification";
import ICONS from "../icons";
import CustomButton from "../customButton";

const RegisterDevcieModal = (props) => {
  const [selectedType, setSelectedType] = useState("");

  const groupSlug = "default";

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
          <h5>Register device</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Row>
            <Col lg="12">
              <Label for="spk2">Device type</Label>
              <select
                className="custom-select"
                id="spk2"
                onChange={(e) => setSelectedType(slugify(e.target.value))}
              >
                {getOptions(props.Types, "", "name")}
              </select>
            </Col>
          </Row>
        </FormGroup>
        {selectedType === "esp32" ? (
          <h4>
            You can download the binary file for your ESP device{" "}
            <Link to="#">here</Link>
          </h4>
        ) : (
          <FormGroup>
            <Label>
              Run the following command on the device you want to register
            </Label>
            <Input
              className="font-size-15"
              type="textarea"
              readOnly={true}
              style={{
                fontFamily: "monospace",
              }}
              rows="4"
              value={commandText(groupSlug, props.token)}
            />
            <br />
            <Label>
              <i className="fas fa-exclamation-triangle warn-color"></i>{" "}
              Important note: Windows devices are not compatibale!
            </Label>
          </FormGroup>
        )}
        {selectedType === "esp32" ? null : (
          <CustomButton
            float="right"
            margin={10}
            handler={() => {
              copyCommand(groupSlug, props.token);
              Notify(
                "command has been copied successfuly",
                "Confirmation",
                "success"
              );
            }}
            text={"  Copy to Clipboard"}
            icon={<i className={ICONS.clipboardIcon} />}
          ></CustomButton>
        )}
        <CustomButton
          float="right"
          handler={() => {
            props.toggle();
            setTimeout(() => setSelectedType(""), 500);
          }}
          text="Cancel"
        ></CustomButton>
      </ModalBody>
    </Modal>
  );
};

RegisterDevcieModal.propTypes = {
  Groups: PropTypes.array,
  Types: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
};

export default RegisterDevcieModal;
