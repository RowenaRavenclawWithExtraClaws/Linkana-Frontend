import React, { useState, useEffect, useRef } from "react";
import { IconPickerItem } from "react-fa-icon-picker";
import { useSelector } from "react-redux";
import { selectDevices } from "../../../redux-utility/Devices/devicesSlice";
import { selectCommands } from "../../../redux-utility/Commands/commandsSlice";
import NoData from "../../../components/Common/NoData";
import Notify from "../../../components/Common/notification";
import { Loader, showInfo } from "../../../helpers/utility";
import { Table, Pagination } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";
import { getPages } from "../../../helpers/utility";

const DevicesTable = (props) => {
  // data state
  const devices = useSelector(selectDevices);
  const commands = useSelector(selectCommands);

  // loading state
  const [fetching, toggleFetching] = useState(true);

  const [curPage, setCurPage] = useState(1);
  const [pageCount] = useState(1);
  // modal state
  //const [isOutputModalOpen, toggleOutputModal] = useState(1);

  const titles = ["status", "serial", "label", "ip", "owner"];

  //let mqttClient = useRef({ initialized: true }); // mqtt client to show devices status

  // temp store for selected command and device
  let curDevice = useRef({});
  let curCommandID = useRef(0);

  const getCommands = async () => {
    /*const commandResObj = await fetchItems(commands, props.token);

    if (commandResObj.status === HTTPSTATUS.ok)
      setCommands(
        commandResObj.body.results.filter(
          (command) => command.show_in_list === true
        )
      );*/
  };

  const getDevices = async () => {
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
        "rcom"
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

  const executeCommand = (command, device) => {
    if (device.is_online) {
      /*publishToTopic(
        mqttClient.current,
        "command",
        device.serial,
        JSON.stringify({
          command: command.id,
          payload: command.payload,
        })
      );*/
      Notify(
        "Command has been executed successfuly",
        "Confirmation",
        "success"
      );

      curDevice.current = device;
      curCommandID.current = command.id;

      //this.toggleOutputModal();
    } else
      Notify(
        "this device is currently offline, try again later",
        "Offline Device",
        "warning"
      );
  };

  const renderExtraCommands = (device) => {
    if (commands.length) {
      return commands.map((command) =>
        command.type === device.type && command.show_in_list ? (
          <i
            id={`com${device.id}${command.title}`}
            key={command.id}
            title={command.title}
            className="command-icon"
            onClick={() => executeCommand(command, device)}
          >
            <IconPickerItem
              icon={command.icon}
              size={18}
              color={command.color}
            />
          </i>
        ) : null
      );
    }
  };

  useEffect(() => {
    /* if (typeof props.searchWord === "string") {
      searchHandler(props.searchWord);
      return;
    }*/

    getDevices();
    getCommands();
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
              renderExtraCommands(item)
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
