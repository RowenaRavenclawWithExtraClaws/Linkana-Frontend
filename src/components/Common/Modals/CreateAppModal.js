import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, Form, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { create } from "../../../redux-utility/Apps/appsSlice";
import CustomButton from "../customButton";
import AppModalForm from "../AppModalForm";
import NavigationBar from "../NavigationBar";
import { slugify } from "../../../helpers/utility";
import Notify from "../notification";

const CreateAppModal = (props) => {
  const dispatch = useDispatch();

  const [activeTab, switchTab] = useState("0");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [version, setVersion] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [icon, setIcon] = useState("FaPlus");
  const [description, setDescription] = useState("");
  const [codeInstall, setCodeInstall] = useState("");
  const [codeUpdate, setCodeUpdate] = useState("");
  const [codeRemove, setCodeRemove] = useState("");
  const [fullscreen, toggleFullscreen] = useState(false);

  const navTitles = ["Basic info", "Scripts"];

  // listen to requesting fullscreen event
  document.addEventListener("fullscreenchange", (ev) =>
    toggleFullscreen(!fullscreen)
  );

  const resetFields = () => {
    setTimeout(() => {
      switchTab("0");
      setTitle("");
      setType("");
      setVersion("");
      setDescription("");
      setColor("#ffffff");
      setIcon("FaPlus");
      setCodeInstall("");
      setCodeUpdate("");
      setCodeRemove("");
    }, 500);
  };

  const createApp = async () => {
    /*const resObj = await postItem(apps, props.token, appData);

    if (resObj.status === 200) {
      Notify("application has been created successfuly", "Congrats", "success");
      if (props.setApps)
        props.setApps(updateStateList(props.Apps, resObj.body));
      props.toggle();
      resetFields();
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");*/
    const appData = {
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

    dispatch(create(appData));
    props.toggle();
    resetFields();
    Notify("application has been created successfuly", "Congrats", "success");
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
          <h5>Create new application</h5>
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
          handler={createApp}
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

CreateAppModal.propTypes = {
  Types: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  token: PropTypes.string,
};

export default CreateAppModal;
