import React, { useState, useEffect, useRef } from "react";
import { Container, Card, CardBody, Table, Pagination } from "reactstrap";
import { apps, devices, services, types } from "../../../helpers/endpoints";
import { fetchItem, fetchItems } from "../../../helpers/requests_helper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Notify from "../../../components/Common/notification";
import {
  getPages,
  getSupportedDevices,
  HTTPSTATUS,
  ITEMSPERPAGE,
  Loader,
  mqttTopics,
  prettifyJsonStr,
  renderActions,
  showInfo,
} from "../../../helpers/utility";
import {
  getMqttClient,
  subscribeToTopic,
  subscribeToStatus,
  unSubscribeToTopic,
  resetOnlineDevices,
} from "../../../helpers/mqtt_helper";
import TableTitles from "../../../components/Common/TableTitles";
import NoData from "../../../components/Common/NoData";
import ICONS from "../../../components/Common/icons";
import { useParams } from "react-router";

const AppsOnDevices = (props) => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data states
  const [app, setApp] = useState([]);
  const [Devices, setDevices] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const token = localStorage.getItem("authUser");
  const appID = useParams().id;
  const titles = ["status", "serial", "label", "os", "owner", "group"];

  let prevPage = useRef(curPage);
  let mqttClient = useRef({ initialized: true });

  const setupMqtt = (serviceInfo, mqttDevices) => {
    mqttClient.current = getMqttClient(serviceInfo);

    mqttDevices.forEach((device) => {
      subscribeToStatus(mqttClient.current, device.serial);
    });
  };

  const getApp = async () => {
    const resObj = await fetchItem(apps, appID, token);

    if (resObj.status === HTTPSTATUS.ok) {
      setApp(resObj.body);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  const getDevices = async () => {
    const serviceObj = await fetchItems(services, token);
    const typesResObj = await fetchItems(types, token);
    const devicesResObj = await fetchItems(devices, token, curPage);

    if (devicesResObj.status === HTTPSTATUS.ok) {
      setupMqtt(serviceObj.body, devicesResObj.body.results);
      setDevices(
        getSupportedDevices(
          devicesResObj.body.results,
          typesResObj.body.results,
          "apps"
        )
      );
      setPageCount(Math.ceil(devicesResObj.body.count / ITEMSPERPAGE));

      // subscribe to the available mqtt topics for apps operations
      devicesResObj.body.results.forEach((device) =>
        mqttTopics.forEach((topic) =>
          subscribeToTopic(mqttClient.current, topic, device.serial)
        )
      );
    } else
      Notify(
        prettifyJsonStr(JSON.stringify(devicesResObj.body)),
        "Error",
        "error"
      );

    toggleFetching(false);
  };

  useEffect(() => {
    if (prevPage.current !== curPage) {
      prevPage.current = curPage;

      Devices.forEach((device) => {
        unSubscribeToTopic(mqttClient.current, "status", device.serial);
      });

      resetOnlineDevices();
    }

    getDevices();
    getApp();

    // unsubscribe from status topic when exiting this page
    return () => {
      if (!mqttClient.current.initialized) mqttClient.current.end(true);
    };
  }, [curPage]); // eslint-disable-line react-hooks/exhaustive-deps

  // operations that can be done on a device
  const actions = [
    (key, device) => (
      <i
        key={`opr_${key}`}
        className={`${ICONS.installIcon} fa-lg cursor-pointer`}
      ></i>
    ),
    (key, device) => (
      <i
        key={`opr_${key}`}
        className={`${ICONS.updateIcon} fa-lg cursor-pointer action-style`}
      ></i>
    ),
    (key, device) => (
      <i
        key={`opr_${key}`}
        className={`${ICONS.trashIcon} fa-lg cursor-pointer action-style`}
      ></i>
    ),
  ];

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem={`App title: ${app.title}`}
          purpose="install, update or uninstall this app on a device"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            {Devices.length ? (
              <React.Fragment>
                <div className="table-responsive">
                  <Table className="table table-centered table-nowrap table-striped">
                    <TableTitles
                      titles={[...titles, ""]}
                      color=""
                    ></TableTitles>
                    <tbody>
                      {showInfo(Devices, titles, "", null, (item) =>
                        renderActions(item, actions)
                      )}
                    </tbody>
                  </Table>
                </div>
                <Pagination className="pagination pagination-rounded justify-content-center mb-2">
                  {getPages(pageCount, curPage, setCurPage).map((page) => page)}
                </Pagination>
              </React.Fragment>
            ) : (
              <NoData
                message="there is no active devices available!"
                subMessage="you can register a new device in Device managment page"
              ></NoData>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AppsOnDevices;
