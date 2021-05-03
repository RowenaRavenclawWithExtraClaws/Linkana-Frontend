import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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
import { useDispatch } from "react-redux";
import { edit } from "../../../redux-utility/Commands/commandsSlice";
import {
  selectStyle,
  terminalKeywords,
  getArrOptions,
} from "../../../helpers/utility";
import { autocomplete } from "../../../helpers/autocomplete";
import CustomButton from "../customButton";
import CustomIconPicker from "../CustomIconPicker";
import Notify from "../notification";

const EditCommandModal = (props) => {
  const dispatch = useDispatch();

  const [selectedMulti, setSelectedMulti] = useState([]);
  const [color, setColor] = useState(props.selectedCommand.color);
  const [icon, setIcon] = useState(props.selectedCommand.icon);

  const animatedComponents = makeAnimated();

  const editCommand = async () => {
    /*const resObj = await patchItem(
      commands,
      props.selectedCommand.id,
      props.token,
      commandData
    );

    if (resObj.status === 200) {
      Notify(
        "command information has been edited successfuly",
        "Congrats",
        "success"
      );
      if (props.setCommands)
        props.setCommands(updateStateList(props.Commands, resObj.body, "edit"));
      props.toggle();
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");*/

    const commandData = {
      id: props.selectedCommand.id,
      title: document.getElementById("tit1").value,
      payload: document.getElementById("pay1").value,
      color: color,
      icon: icon,
    };

    dispatch(edit(commandData));
    Notify(
      "command information has been edited successfuly",
      "Congrats",
      "success"
    );
    props.toggle();
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
          <h5>Edit command {props.selectedCommand.title}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Form>
              <Col lg="13">
                <FormGroup>
                  <Label for="tit1">title</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="tit1"
                    defaultValue={props.selectedCommand.title}
                  />
                </FormGroup>
              </Col>
              <Col lg="13">
                <Label>Device types</Label>
                <Select
                  styles={selectStyle}
                  value={selectedMulti}
                  isMulti={true}
                  onChange={(selectedMultiValue) =>
                    setSelectedMulti(selectedMultiValue)
                  }
                  options={getArrOptions(props.Types, "", "name")}
                  classNamePrefix="select2-selection"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                />
                <br />
              </Col>
              <Col lg="13">
                <Label for="pay1">Payload</Label>
                <div className="autocomplete">
                  <Input
                    id="pay1"
                    type="text"
                    placeholder="bash script..."
                    defaultValue={props.selectedCommand.payload}
                    onFocus={(e) => autocomplete(e.target, terminalKeywords)}
                  />
                </div>
                <br />
              </Col>
              <Row>
                <Col lg="10">
                  <FormGroup>
                    <Label>Color</Label>
                    <input
                      className="form-control"
                      type="color"
                      defaultValue={color}
                      id="col1"
                      onChange={(ev) => setColor(ev.currentTarget.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="2">
                  <Label>Icon</Label>
                  <CustomIconPicker
                    icon={icon}
                    color={color}
                    setIcon={(newIcon) => setIcon(newIcon)}
                  ></CustomIconPicker>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={editCommand}
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

EditCommandModal.protoTypes = {
  Types: PropTypes.bool,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
};

export default EditCommandModal;
