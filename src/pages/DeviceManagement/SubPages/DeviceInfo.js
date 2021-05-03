import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, Table, Label } from "reactstrap";
import { devices } from "../../../helpers/endpoints";
import { fetchItem } from "../../../helpers/requests_helper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Notify from "../../../components/Common/notification";
import {
  formatDate,
  HTTPSTATUS,
  Loader,
  prettifyJsonStr,
} from "../../../helpers/utility";
import SimpleMap from "./Components/SimpleMap";
import { useParams } from "react-router";

const DeviceInfo = (props) => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data states
  const [Device, setDevice] = useState({});

  const token = localStorage.getItem("authUser");
  const serial = useParams().id;
  const mapHeight = 100;

  const getDevice = async () => {
    const resObj = await fetchItem(devices, serial, token);

    if (resObj.status === HTTPSTATUS.ok) {
      delete resObj.body.token; // don't display sensitive device token data
      if (!resObj.body.type) resObj.body.type = ""; // solve the issue where empty device type fields are null not an empty string
      setDevice(resObj.body);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);
  };

  useEffect(() => {
    getDevice();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Device inforamtion"
          purpose={`serial: ${Device.serial}${
            Device.label.length ? `, label: ${Device.label}` : ""
          }`}
        ></Breadcrumbs>
        {Device.lat ? (
          Device.lat.length ? (
            <React.Fragment>
              <SimpleMap
                lat={Device.lat}
                long={Device.long}
                height={mapHeight}
              ></SimpleMap>
              <br />
              <Label>Device inforamtion</Label>
            </React.Fragment>
          ) : null
        ) : null}
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table table-centered table-nowrap table-striped">
                <tbody>
                  {Object.keys(Device).map((key, i) =>
                    typeof Device[key] !== "string" ? null : (
                      <tr key={`trd_${i}`}>
                        <td>{key}</td>
                        <td>
                          {key.slice(-3) === "_at"
                            ? formatDate(Device[key])
                            : Device[key]}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default DeviceInfo;
