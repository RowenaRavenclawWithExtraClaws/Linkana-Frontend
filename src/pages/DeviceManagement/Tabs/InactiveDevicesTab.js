import React, { useState, useEffect, useRef } from "react";
import NoData from "../../../components/Common/NoData";
import Notify from "../../../components/";
import { devices } from "../../../helpers/endpoints";
import { fetchItems } from "../../../helpers/requests_helper";
import {
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
import DeleteDeviceModal from "../../../components/Common/Modals/DeleteDeviceModal";
import ChangeDeviceStateModal from "../../../components/Common/Modals/ChangeDeviceStateModal";
import ROUTES from "../../../helpers/routes_helper";
import { Link } from "react-router-dom";

const InactiveDevicesTab = (props) => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data state
  const [Devices, setDevices] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  // modal state
  const [isDeleteDeviceModalOpen, toggleDeleteDeviceModal] = useState(false);
  const [isEnableDeviceModalOpen, toggleEnableDeviceModal] = useState(false);

  const titles = [
    "status",
    "serial",
    "label",
    "os",
    "ip",
    "owner",
    "group",
    "wifi_ssid",
  ];
  let selectedDevice = useRef({}); // store selected device

  // operations that can be done on a device
  const actions = [
    (key, device) => (
      <Link key={`act_${key}`} to={ROUTES.deviceInfo}>
        <i
          title="show device info"
          className={`${ICONS.infoIcon} fa-lg cursor-pointer`}
          onClick={() => localStorage.setItem("serial", device.serial)}
        ></i>
      </Link>
    ),
    (key, device) => (
      <Link key={`act_${key}`} to={ROUTES.devcieEdit}>
        <i
          key={`act_${key}`}
          title="edit device information"
          className={`${ICONS.penIcon} fa-lg cursor-pointer action-style`}
          onClick={() => localStorage.setItem("serial", device.serial)}
        ></i>
      </Link>
    ),
    (key, device) => (
      <i
        key={`act_${key}`}
        title="enable device"
        className={`${ICONS.enableIcon} fa-lg cursor-pointer action-style`}
        onClick={() => {
          selectedDevice.current = device;
          toggleEnableDeviceModal(true);
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

  const getDevices = async (url) => {
    const resObj = await fetchItems(
      url,
      props.token,
      curPage,
      "&disabled=true"
    );

    if (resObj.status === HTTPSTATUS.ok) {
      setDevices(resObj.body.results);
      setPageCount(Math.ceil(resObj.body.count / ITEMSPERPAGE));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);
  };

  useEffect(() => {
    getDevices(devices);
  }, [curPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const modals = [
    (key) => (
      <DeleteDeviceModal
        key={`modal_${key}`}
        isOpen={isDeleteDeviceModalOpen}
        toggle={() => toggleDeleteDeviceModal(false)}
        device={selectedDevice.current}
        token={props.token}
        Devices={Devices}
        setDevices={setDevices}
      ></DeleteDeviceModal>
    ),
    (key) => (
      <ChangeDeviceStateModal
        key={`modal_${key}`}
        enable={true}
        isOpen={isEnableDeviceModalOpen}
        toggle={() => toggleEnableDeviceModal(false)}
        device={selectedDevice.current}
        token={props.token}
        Devices={Devices}
        setDevices={setDevices}
      ></ChangeDeviceStateModal>
    ),
  ];

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
      {modals.map((modal, key) => modal(key))}
    </React.Fragment>
  ) : (
    //rendered in the absence of data
    <div id="devices_table">
      <NoData
        message="No inactive devices are available!"
        subMessage="you can deactivate a device in the Active devices tab"
      ></NoData>
    </div>
  );
};

export default InactiveDevicesTab;
