import React, { useState, useEffect, useRef } from "react";
import { Container, Card, CardBody, Table, Pagination } from "reactstrap";
import { outputs } from "../../../helpers/endpoints";
import { fetchItems } from "../../../helpers/requests_helper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Notify from "../../../components/Common/notification";
import {
  formatDate,
  getPages,
  HTTPSTATUS,
  ITEMSPERPAGE,
  Loader,
  prettifyJsonStr,
} from "../../../helpers/utility";
import TableTitles from "../../../components/Common/TableTitles";
import NoData from "../../../components/Common/NoData";
import ICONS from "../../../components/Common/icons";
import { useParams } from "react-router";

const CommandHistory = () => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data states
  const [Outputs, setOutputs] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const token = localStorage.getItem("authUser");
  const commandTitle = localStorage.getItem("command-title");
  const commandID = useParams().id;
  const titles = [
    "Device serial",
    "Device label",
    "Execution date",
    "Execution time",
    "Output",
    "",
  ];

  let prevPage = useRef(curPage); // check for page changes

  const getOutputs = async () => {
    const resObj = await fetchItems(
      outputs,
      token,
      curPage,
      `&command=${commandID}`
    );

    if (resObj.status === HTTPSTATUS.ok) {
      setOutputs(resObj.body.results);
      setPageCount(Math.ceil(resObj.body.count / ITEMSPERPAGE));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);
  };

  useEffect(() => {
    if (prevPage.current !== curPage) prevPage.current = curPage;

    getOutputs();
  }, [curPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime = (time) => time.slice(11, 19); // very very custom date format only for the outputs data

  const showOutputsInfo = () =>
    Outputs.map((output, key) => (
      <tr key={"_order_" + key}>
        <td>{output.device.serial}</td>
        <td>{output.device.label}</td>
        <td>{formatDate(output.command.created_at)}</td>
        <td>{formatTime(output.command.created_at)}</td>
        <td>
          <div style={{ float: "right" }}>
            <i
              className={`${ICONS.eyeIcon} fa-lg cursor-pointer`}
              title="show output"
              onClick={() => {
                /*curKey = key;
              toggleModal(!isModalOpen);*/
              }}
            ></i>
            <i
              title="delete output"
              className={`${ICONS.trashIcon} fa-lg cursor-pointer action-style`}
              onClick={() => {
                /*selectedDevice.current = device;
                toggleDeleteDeviceModal(true);*/
              }}
            ></i>
          </div>
        </td>
      </tr>
    ));

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem={`Command title: ${commandTitle}`}
          purpose="list of the latest executions"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            {Outputs.length ? (
              <React.Fragment>
                <div className="table-responsive">
                  <Table className="table table-centered table-nowrap table-striped">
                    <TableTitles titles={titles} color=""></TableTitles>
                    <tbody>{showOutputsInfo()}</tbody>
                  </Table>
                </div>
                <Pagination className="pagination pagination-rounded justify-content-center mb-2">
                  {getPages(pageCount, curPage, setCurPage).map((page) => page)}
                </Pagination>
              </React.Fragment>
            ) : (
              <NoData
                message="This command has not executed yet!"
                subMessage="go to the Devices sub-menu in the Remote control menu and start executing some commands on the devices"
              ></NoData>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CommandHistory;
