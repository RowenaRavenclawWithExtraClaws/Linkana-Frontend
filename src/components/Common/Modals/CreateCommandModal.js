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
import { create } from "../../../redux-utility/Commands/commandsSlice";
import {
  selectStyle,
  arrOfTypeSlugs,
  terminalKeywords,
  getArrOptions,
} from "../../../helpers/utility";
import { autocomplete } from "../../../helpers/autocomplete";
import CustomButton from "../customButton";
import CustomIconPicker from "../CustomIconPicker";
import Notify from "../notification";

const CreateCommandModal = (props) => {
  const dispatch = useDispatch();

  const [selectedMulti, setSelectedMulti] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [icon, setIcon] = useState("FaPlus");

  const animatedComponents = makeAnimated();

  const resetFields = () => {
    setTimeout(() => {
      setSelectedMulti(null);
      setColor("#ffffff");
      setIcon("FaPlus");
    }, 100);
  };

  const createCommand = async () => {
    const commandData = {
      title: document.getElementById("tit1").value,
      type: arrOfTypeSlugs(selectedMulti),
      payload: document.getElementById("pay1").value,
      color: color,
      icon: icon,
      show_in_list: false,
    };

    /* const resObj = await postItem(commands, props.token, commandData);

    if (resObj.status === 200) {
      Notify("command has been created successfuly", "Congrats", "success");
      if (props.setCommands)
        props.setCommands(updateStateList(props.Commands, resObj.body));
      props.toggle();
      resetFields();
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");*/

    dispatch(create(commandData));
    props.toggle();
    resetFields();
    Notify("command has been created successfuly", "Congrats", "success");
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
          <h5>Create new command</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Form>
              <Col lg="13">
                <FormGroup>
                  <Label for="tit1">title</Label>
                  <Input type="text" className="form-control" id="tit1" />
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
          handler={createCommand}
          text="Create"
        ></CustomButton>
        <CustomButton
          float="right"
          handler={() => {
            props.toggle();
            resetFields();
          }}
          text="Cancel"
        ></CustomButton>
      </ModalBody>
    </Modal>
  );
};

CreateCommandModal.protoTypes = {
  Types: PropTypes.bool,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
};

export default CreateCommandModal;
