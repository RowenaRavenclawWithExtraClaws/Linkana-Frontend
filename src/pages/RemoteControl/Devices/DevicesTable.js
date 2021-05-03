import React, { useState, useEffect, useRef } from "react";
import NoData from "../../../components/Common/NoData";
import Notify from "../../../components/Common/notification";
import { devices, services, types } from "../../../helpers/endpoints";
import { fetchItems } from "../../../helpers/requests_helper";
import {
  getSupportedDevices,
  HTTPSTATUS,
  ITEMSPERPAGE,
  Loader,
  prettifyJsonStr,
  renderActions,
  showInfo,
} from "../../../helpers/utility";
import { Table, Pagination } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";
import ICONS from "../../../components/Common/icons";
import { getPages } from "../../../helpers/utility";
import ROUTES from "../../../helpers/routes_helper";
import {
  getMqttClient,
  subscribeToStatus,
  unSubscribeToTopic,
  resetOnlineDevices,
} from "../../../helpers/mqtt_helper";

const DevicesTable = (props) => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data state
  const [Devices, setDevices] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const titles = ["status", "serial", "label", "os", "ip", "owner", "group"];

  let prevPage = useRef(curPage); // check for page changes
  let mqttClient = useRef({ initialized: true }); // mqtt client to show devices status

  // operations that can be done on a device
  const actions = [
    (key, device) => (
      <i
        key={`act_${key}`}
        id={`tr${device.serial}`}
        title="show device metrics charts"
        className={`${ICONS.terminalIcon} fa-lg cursor-pointer`}
        onClick={() => {
          if (
            document.getElementById(`st${device.serial}`).style.color ===
            "green"
          ) {
            localStorage.setItem("serial", device.serial);
            localStorage.setItem("label", device.label);
            setTimeout(() => window.open(ROUTES.terminal), 100);
          } else
            Notify("this device is currently offline", "Warning", "warning");
        }}
      ></i>
    ),
  ];

  const setupMqtt = (serviceInfo, mqttDevices) => {
    mqttClient.current = getMqttClient(serviceInfo);

    mqttDevices.forEach((device) => {
      subscribeToStatus(mqttClient.current, device.serial);
    });
  };

  const getDevices = async () => {
    const serviceObj = await fetchItems(services, props.token);

    const typesResObj = await fetchItems(types, props.token);

    const devicesResObj = await fetchItems(
      devices,
      props.token,
      curPage,
      "&disabled=false"
    );

    if (devicesResObj.status === HTTPSTATUS.ok) {
      const supportedDevices = getSupportedDevices(
        devicesResObj.body.results,
        typesResObj.body.results,
        "rcon"
      );

      setupMqtt(serviceObj.body, supportedDevices);
      setDevices(supportedDevices);
      setPageCount(Math.ceil(devicesResObj.body.count / ITEMSPERPAGE));
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

    // unsubscribe from status topic when exiting this page
    return () => {
      if (!mqttClient.current.initialized) mqttClient.current.end(true);
    };
  }, [curPage]); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetching) return <Loader />;

  return Devices.length ? (
    <React.Fragment>
      <div id="devices_table" className="table-responsive">
        <Table className="table table-centered table-nowrap table-striped">
          <TableTitles titles={[...titles, ""]} color=""></TableTitles>
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
    //rendered in the absence of data
    <div id="devices_table">
      <NoData message="No active devices are available!"></NoData>
    </div>
  );
};

export default DevicesTable;
