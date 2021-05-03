import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Row, Col, Input, Label } from "reactstrap";
import { FullscreenToggle, getOptions } from "../../helpers/utility";
import CustomIconPicker from "./CustomIconPicker";
import ShellEditor from "./ShellEditor";

const AppModalForm = (props) => {
  const renderBasicInfo = () => (
    <React.Fragment>
      <Row>
        <Col lg="6">
          <FormGroup>
            <Label for="tit1">title</Label>
            <Input
              type="text"
              className="form-control"
              id="tit1"
              defaultValue={props.title}
              onChange={(e) => props.setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col lg="6">
          <FormGroup>
            <Label for="typ1">Device type</Label>
            <select
              className="custom-select"
              id="typ1"
              defaultValue={props.type}
              onChange={(e) => props.setType(e.target.value)}
            >
              {getOptions(props.Types, props.type, "name")}
            </select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="5">
          <FormGroup>
            <Label for="ver1">Version</Label>
            <Input
              type="text"
              className="form-control"
              id="ver1"
              defaultValue={props.version}
              onChange={(e) => props.setVersion(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col lg="5">
          <FormGroup>
            <Label for="col1">Color</Label>
            <input
              className="form-control"
              type="color"
              id="col1"
              defaultValue={props.color}
              onChange={(ev) => props.setColor(ev.target.value)}
            />
          </FormGroup>
        </Col>
        <Col lg="2">
          <Label>Icon</Label>
          <CustomIconPicker
            icon={props.icon}
            color={props.color}
            setIcon={(newIcon) => props.setIcon(newIcon)}
          ></CustomIconPicker>
        </Col>
      </Row>
      <Col lg="13">
        <FormGroup>
          <Label for="des1">Description</Label>
          <Input
            type="textarea"
            rows={2}
            className="form-control"
            id="des1"
            defaultValue={props.description}
            onChange={(ev) => props.setDescription(ev.target.value)}
          />
        </FormGroup>
      </Col>
    </React.Fragment>
  );

  const renderScriptFields = () => (
    <React.Fragment>
      <Col lg="13">
        <FormGroup id="ins1">
          <Label style={{ display: "inline-block" }} for="ins1">
            Installer command (bash script)
          </Label>
          <FullscreenToggle
            fullScreen={props.fullScreen}
            elementID="ins1"
          ></FullscreenToggle>
          <ShellEditor
            code={props.codeInstall}
            fullScreen={props.fullScreen}
            setCode={(newCode) => props.setCodeInstall(newCode)}
          ></ShellEditor>
        </FormGroup>
      </Col>
      <Col lg="13">
        <FormGroup id="upd1">
          <Label style={{ display: "inline-block" }} for="upd1">
            Updater command (bash script)
          </Label>
          <FullscreenToggle
            fullScreen={props.fullScreen}
            elementID="upd1"
          ></FullscreenToggle>
          <ShellEditor
            code={props.codeUpdate}
            fullScreen={props.fullScreen}
            setCode={(newCode) => props.setCodeUpdate(newCode)}
          ></ShellEditor>
        </FormGroup>
      </Col>
      <Col lg="13">
        <FormGroup id="rem1">
          <Label style={{ display: "inline-block" }} for="rem1">
            Remover command (bash script)
          </Label>
          <FullscreenToggle
            fullScreen={props.fullScreen}
            elementID="rem1"
          ></FullscreenToggle>
          <ShellEditor
            code={props.codeRemove}
            fullScreen={props.fullScreen}
            setCode={(newCode) => props.setCodeRemove(newCode)}
          ></ShellEditor>
        </FormGroup>
      </Col>
    </React.Fragment>
  );

  return props.activeTab === "0" ? renderBasicInfo() : renderScriptFields();
};

AppModalForm.propTypes = {
  Types: PropTypes.array,
  fullScreen: PropTypes.bool,
  activeTab: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  version: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  codeInstall: PropTypes.string,
  codeUpdate: PropTypes.string,
  codeRemove: PropTypes.string,
  setTitle: PropTypes.func,
  setType: PropTypes.func,
  setVersion: PropTypes.func,
  setColor: PropTypes.func,
  setIcon: PropTypes.func,
  setDescription: PropTypes.func,
  setCodeInstall: PropTypes.func,
  setCodeUpdate: PropTypes.func,
  setCodeRemove: PropTypes.func,
};

export default AppModalForm;
