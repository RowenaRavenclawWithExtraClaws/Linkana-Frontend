import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDevices } from "../../../redux-utility/Devices/devicesSlice";
import NoData from "../../../components/Common/NoData";
import { Loader, renderActions, showInfo } from "../../../helpers/utility";
import { Table, Pagination } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";
import ICONS from "../../../components/Common/icons";
import { getPages } from "../../../helpers/utility";
import { Link } from "react-router-dom";

const DevicesTable = (props) => {
  // data state
  const devices = useSelector(selectDevices);
  // used to determine the sort feature for a handful of columns

  // loading state
  const [fetching, toggleFetching] = useState(true);

  const [curPage, setCurPage] = useState(1);
  const [pageCount] = useState(1);

  const titles = ["status", "serial", "label", "ip", "owner"];

  //let devicesBackup = useRef([]); // store backup for devices for search purposes

  // operations that can be done on a device
  const actions = [
    (key, device) => (
      <Link key={`act_${key}`} to="#">
        <i
          title="show device metrics charts"
          className={`${ICONS.graphIcon} fa-lg cursor-pointer`}
          onClick={() => {
            localStorage.setItem("serial", device.serial);
            localStorage.setItem("label", device.label);
          }}
        ></i>
      </Link>
    ),
  ];

  /*const setupMqtt = (serviceInfo, mqttDevices) => {
    mqttClient.current = getMqttClient(serviceInfo);

    mqttDevices.forEach((device) => {
      subscribeToStatus(mqttClient.current, device.serial);
    });
  };*/

  const getDevices = () => {
    /*const serviceObj = await fetchItems(services, props.token);

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
        "mon"
      );

      setupMqtt(serviceObj.body, supportedDevices);
      setDevices(supportedDevices);
      setPageCount(Math.ceil(devicesResObj.body.count / ITEMSPERPAGE));
      devicesBackup.current = supportedDevices;
    } else
      Notify(
        prettifyJsonStr(JSON.stringify(devicesResObj.body)),
        "Error",
        "error"
      );

    toggleFetching(false);*/
    setTimeout(() => toggleFetching(false), 1000);
  };

  useEffect(() => {
    /*if (typeof props.searchWord === "string") {
      searchHandler(props.searchWord);
      return;
    }*/

    getDevices();
  }, [curPage, props.searchWord]); // eslint-disable-line react-hooks/exhaustive-deps

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
    </React.Fragment>
  ) : (
    //rendered in the absence of data
    <div id="devices_table">
      <NoData message="No active devices are available!"></NoData>
    </div>
  );
};

export default DevicesTable;
