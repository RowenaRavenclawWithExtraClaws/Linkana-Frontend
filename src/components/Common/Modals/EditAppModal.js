import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, Form, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { edit } from "../../../redux-utility/Apps/appsSlice";
import CustomButton from "../customButton";
import AppModalForm from "../AppModalForm";
import NavigationBar from "../NavigationBar";
import { slugify } from "../../../helpers/utility";
import Notify from "../notification";

const EditAppModal = (props) => {
  const dispatch = useDispatch();

  const [activeTab, switchTab] = useState("0");
  const [title, setTitle] = useState(props.selectedApp.title);
  const [type, setType] = useState("");
  const [version, setVersion] = useState(props.selectedApp.version);
  const [color, setColor] = useState(props.selectedApp.color);
  const [icon, setIcon] = useState(props.selectedApp.icon);
  const [description, setDescription] = useState(props.selectedApp.description);
  const [codeInstall, setCodeInstall] = useState(props.selectedApp.installer);
  const [codeUpdate, setCodeUpdate] = useState(props.selectedApp.updater);
  const [codeRemove, setCodeRemove] = useState(props.selectedApp.remover);
  const [fullscreen, toggleFullscreen] = useState(false);

  const navTitles = ["Basic info", "Scripts"];

  // listen to requesting fullscreen event
  document.addEventListener("fullscreenchange", (ev) =>
    toggleFullscreen(!fullscreen)
  );

  const resetFields = () => {
    setTimeout(() => {
      switchTab("0");
    }, 500);
  };

  const editApp = async () => {
    const appData = {
      id: props.selectedApp.id,
      title: title,
      slug: slugify(title),
      version: version,
      description: description,
      color: color,
      icon: icon,
      installer: codeInstall,
      updater: codeUpdate,
      remover: codeRemove,
    };

    /*const resObj = await patchItem(
      apps,
      props.selectedApp.id,
      props.token,
      appData
    );

    if (resObj.status === 200) {
      Notify(
        "application information has been edited successfuly",
        "Congrats",
        "success"
      );
      props.setApps(updateStateList(props.Apps, resObj.body, "edit"));
      props.toggle();
      resetFields();
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");*/

    dispatch(edit(appData));
    Notify(
      "application information has been edited successfuly",
      "Congrats",
      "success"
    );
    props.toggle();
    resetFields();
  };

  return (
    <Modal
      isOpen={props.isOpen}
      role="dialog"
      autoFocus={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={() => {
        props.toggle();
        resetFields();
      }}
    >
      <ModalHeader>
        <div>
          <h5>{`Edit application ${props.selectedApp.title}`}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <NavigationBar
              titles={navTitles}
              activeTab={activeTab}
              switchTab={switchTab}
            ></NavigationBar>
            <br></br>
            <Form>
              <AppModalForm
                Types={props.Types}
                activeTab={activeTab}
                title={title}
                type={type}
                version={version}
                color={color}
                icon={icon}
                description={description}
                codeInstall={codeInstall}
                codeUpdate={codeUpdate}
                codeRemove={codeRemove}
                setTitle={setTitle}
                setType={setType}
                setVersion={setVersion}
                setColor={setColor}
                setIcon={setIcon}
                setDescription={setDescription}
                setCodeInstall={setCodeInstall}
                setCodeUpdate={setCodeUpdate}
                setCodeRemove={setCodeRemove}
                fullScreen={fullscreen}
              ></AppModalForm>
            </Form>
          </Col>
        </Row>
        <br></br>
        <CustomButton
          float="right"
          margin={10}
          handler={editApp}
          text="Save changes"
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

EditAppModal.propTypes = {
  Types: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
  selectedApp: PropTypes.object,
  Apps: PropTypes.array,
  setApps: PropTypes.func,
};

export default EditAppModal;
