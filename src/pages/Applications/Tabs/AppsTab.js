import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { edit } from "../../../redux-utility/Apps/appsSlice";
import AppCard from "../../../components/Common/Cards/AppCard";
import Notify from "../../../components/Common/notification";
import NoData from "../../../components/Common/NoData";
import DeleteAppModal from "../../../components/Common/Modals/DeleteAppModal";
import EditAppModal from "../../../components/Common/Modals/EditAppModal";

const AppsTab = (props) => {
  const dispatch = useDispatch();

  // modal states
  const [isDeleteAppModalOpen, toggleDeleteAppModal] = useState(false);
  const [isEditAppModalOpen, toggleEditAppModal] = useState(false);

  let selectedApp = useRef({});

  const deleteHandler = (app) => {
    selectedApp.current = app;
    toggleDeleteAppModal(true);
  };

  const editHandler = (app) => {
    selectedApp.current = app;
    toggleEditAppModal(true);
  };

  const enableDisableHandler = (app) => {
    /*const routeParam = app.active ? "disable" : "enable";
    const activeAction = app.active ? "remove" : "add";
    const inactiveAction = app.active ? "add" : "remove";

    const resObj = await changeItemState(apps, props.token, app.id, routeParam);

    if (resObj.status === HTTPSTATUS.ok) {
      Notify(
        `device has been ${routeParam}d successfuly`,
        "Congrats",
        "success"
      );
      props.setActiveApps(
        updateStateList(
          props.ActiveApps,
          { ...app, active: !app.active },
          activeAction
        )
      );
      props.setInactiveApps(
        updateStateList(
          props.InactiveApps,
          { ...app, active: !app.active },
          inactiveAction
        )
      );
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");*/

    const action = app.is_enabled ? "disable" : "enable";

    dispatch(edit({ id: app.id, is_enabled: !app.is_enabled }));
    Notify(`device has been ${action}d successfuly`, "Congrats", "success");
  };

  const modals = [
    (key) => (
      <DeleteAppModal
        key={`moda_${key}`}
        isOpen={isDeleteAppModalOpen}
        toggle={() => toggleDeleteAppModal(false)}
        token={props.token}
        selectedApp={selectedApp.current}
        Apps={props.InactiveApps}
        setApps={props.setInactiveApps}
      ></DeleteAppModal>
    ),
    (key) =>
      isEditAppModalOpen ? (
        <EditAppModal
          key={`moda_${key}`}
          isOpen={isEditAppModalOpen}
          toggle={() => toggleEditAppModal(false)}
          token={props.token}
          selectedApp={selectedApp.current}
          Apps={props.activeTab === "0" ? props.ActiveApps : props.InactiveApps}
          Types={props.Types}
          setApps={
            props.activeTab === "0"
              ? props.setActiveApps
              : props.setInactiveApps
          }
        ></EditAppModal>
      ) : null,
  ];

  return props.Apps.length ? (
    <React.Fragment>
      <Row className="app-margin-top">
        {props.Apps.map((app, key) => (
          <Col key={`app_card_${key}`} lg={4}>
            <AppCard
              app={app}
              deleteHandler={deleteHandler}
              enableDisableHandler={enableDisableHandler}
              editHandler={editHandler}
            ></AppCard>
          </Col>
        ))}
      </Row>
      {modals.map((modal, key) => modal(key))}
    </React.Fragment>
  ) : (
    //rendered in the absence of data
    <div id="apps_grid">
      <NoData message="No apps are available in this tab!"></NoData>
    </div>
  );
};

AppsTab.propTypes = {
  Apps: PropTypes.array,
  ActiveApps: PropTypes.array,
  InactiveApps: PropTypes.array,
  Types: PropTypes.array,
  token: PropTypes.string,
  activeTab: PropTypes.string,
  setActiveApps: PropTypes.func,
  setInactiveApps: PropTypes.func,
};

export default AppsTab;
