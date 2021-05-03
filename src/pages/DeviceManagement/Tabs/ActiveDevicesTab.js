import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectDevices } from "../../../redux-utility/Devices/devicesSlice";
import NoData from "../../../components/Common/NoData";
import Notify from "../../../components/Common/notification";
import { Loader, renderActions, showInfo } from "../../../helpers/utility";
import { Table, Pagination } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";
import ICONS from "../../../components/Common/icons";
import { getPages } from "../../../helpers/utility";
import DeleteDeviceModal from "../../../components/Common/Modals/DeleteDeviceModal";
import ChangeDeviceStateModal from "../../../components/Common/Modals/ChangeDeviceStateModal";
import { Link } from "react-router-dom";

const ActiveDevicesTab = (props) => {
  // data state
  const devices = useSelector(selectDevices);

  // loading state
  const [fetching, toggleFetching] = useState(true);

  const [curPage, setCurPage] = useState(1);
  const [pageCount] = useState(1);
  // modal state
  const [isDeleteDeviceModalOpen, toggleDeleteDeviceModal] = useState(false);
  const [isDisableDeviceModalOpen, toggleDisableDeviceModal] = useState(false);

  const titles = [
    "status",
    "serial",
    "label",
    "os",
    "ip",
    "owner",
    "wifi_ssid",
  ];

  let selectedDevice = useRef({}); // store selected device
  //let devicesBackup = useRef([]); // store backup for devices for search purposes

  // operations that can be done on a device
  const actions = [
    (key, device) => (
      <Link key={`act_${key}`} to="#">
        <i
          title="show device info"
          className={`${ICONS.infoIcon} fa-lg cursor-pointer`}
        ></i>
      </Link>
    ),
    (key, device) => (
      <Link key={`act_${key}`} to="#">
        <i
          title="edit device information"
          className={`${ICONS.penIcon} fa-lg cursor-pointer action-style`}
        ></i>
      </Link>
    ),
    (key, device) => (
      <i
        key={`act_${key}`}
        id={`tr${device.serial}`}
        title="access device via terminal interface"
        className={`${ICONS.terminalIcon} fa-lg cursor-pointer action-style`}
        onClick={() => {
          if (device.is_online) {
            localStorage.setItem("label", device.label);
            setTimeout(
              () => window.open(`/remote-control/terminal/${device.serial}`),
              100
            );
          } else
            Notify("this device is currently offline", "Warning", "warning");
        }}
      ></i>
    ),
    (key, device) => (
      <i
        key={`act_${key}`}
        title="delete device"
        className={`${ICONS.trashIcon} fa-lg cursor-pointer action-style`}
        onClick={() => {
          selectedDevice.current = device;
          toggleDeleteDeviceModal(true);
        }}
      ></i>
    ),
  ];

  /*const setupMqtt = (serviceInfo, mqttDevices) => {
    mqttClient.current = getMqttClient(serviceInfo);

    mqttDevices.forEach((device) => {
      subscribeToStatus(mqttClient.current, device.serial);
    });
  };*/

  const getDevices = (/*url*/) => {
    setTimeout(() => toggleFetching(false), 1000);
  };

  useEffect(() => {
    /*if (typeof props.searchWord === "string") {
      searchHandler(props.searchWord);
      return;
    }*/

    getDevices();
  }, [curPage, props.searchWord]); // eslint-disable-line react-hooks/exhaustive-deps

  const modals = [
    (key) => (
      <DeleteDeviceModal
        key={`mod_${key}`}
        isOpen={isDeleteDeviceModalOpen}
        toggle={() => toggleDeleteDeviceModal(false)}
        device={selectedDevice.current}
        token={props.token}
        Devices={devices}
        setDevices={() => {}}
      ></DeleteDeviceModal>
    ),
    (key) => (
      <ChangeDeviceStateModal
        key={`mod_${key}`}
        isOpen={isDisableDeviceModalOpen}
        toggle={() => toggleDisableDeviceModal(false)}
        device={selectedDevice.current}
        token={props.token}
        Devices={devices}
        setDevices={() => {}}
      ></ChangeDeviceStateModal>
    ),
  ];

  /*const searchHandler = (searchWord) => {
    setDevices(
      devicesBackup.current.filter((device) =>
        device.label.toLowerCase().includes(searchWord.toLowerCase())
      )
    );
  };*/

  /*const generateSortHandlers = () =>
    sortTitles.map((title, key) => () => {
      setDevices(sortItems(devices, title, !sortDirections[key]));
      setSortDirections(
        sortDirections.map((sortDirection, i) =>
          key === i ? !sortDirection : sortDirection
        )
      );
    });*/

  if (fetching) return <Loader />;

  return devices.length ? (
    <React.Fragment>
      <div id="devices_table" className="table-responsive">
        <Table className="table table-centered table-nowrap table-striped">
          <TableTitles titles={[...titles, ""]} color=""></TableTitles>
          <tbody>
            {showInfo(devices, titles, "", null, (item) =>
              renderActions(item, actions)
            )}
          </tbody>
        </Table>
      </div>
      <Pagination className="pagination pagination-rounded justify-content-center mb-2">
        {getPages(pageCount, curPage, setCurPage).map((page) => page)}
      </Pagination>
      {modals.map((modal, key) => modal(key))}
    </React.Fragment>
  ) : (
    //rendered in the absence of data
    <div id="devices_table">
      <NoData
        message="No active devices are available!"
        subMessage="you can see if your device is inactive in the Inactive devices tab or register a new one with the Register device button"
      ></NoData>
    </div>
  );
};

export default ActiveDevicesTab;
