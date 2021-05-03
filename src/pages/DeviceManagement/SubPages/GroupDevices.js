import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, Table, Pagination } from "reactstrap";
import { devices } from "../../../helpers/endpoints";
import { fetchItems } from "../../../helpers/requests_helper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Notify from "../../../components/Common/notification";
import {
  getPages,
  HTTPSTATUS,
  ITEMSPERPAGE,
  Loader,
  prettifyJsonStr,
  showInfo,
} from "../../../helpers/utility";
import TableTitles from "../../../components/Common/TableTitles";

const GroupDevices = (props) => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data states
  const [Devices, setDevices] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const token = localStorage.getItem("authUser");
  const groupSlug = localStorage.getItem("group-slug");
  const titles = ["serial", "label", "os", "ip", "owner", "group", "wifi_ssid"];

  const getDevices = async () => {
    const resObj = await fetchItems(
      devices,
      token,
      curPage,
      `&group__slug=${groupSlug}`
    );

    if (resObj.status === HTTPSTATUS.ok) {
      setDevices(resObj.body.results);
      setPageCount(Math.ceil(resObj.body.count / ITEMSPERPAGE));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);
  };

  useEffect(() => {
    getDevices();
  }, [curPage]); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem={`Group name: ${groupSlug}`}
          purpose="list of devices in this group"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table table-centered table-nowrap table-striped">
                <TableTitles titles={titles} color=""></TableTitles>
                <tbody>{showInfo(Devices, titles, "")}</tbody>
              </Table>
            </div>
            <Pagination className="pagination pagination-rounded justify-content-center mb-2">
              {getPages(pageCount, curPage, setCurPage).map((page) => page)}
            </Pagination>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default GroupDevices;
