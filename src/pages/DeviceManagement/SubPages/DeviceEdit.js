import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { devices, types } from "../../../helpers/endpoints";
import {
  fetchItem,
  fetchItems,
  patchItem,
} from "../../../helpers/requests_helper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Notify from "../../../components/Common/notification";
import {
  getOptions,
  HTTPSTATUS,
  Loader,
  prettifyJsonStr,
  slugify,
} from "../../../helpers/utility";
import ROUTES from "../../../helpers/routes_helper";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../../components/Common/customButton";
import SimpleMap from "./Components/SimpleMap";

const DeviceEdit = (props) => {
  // data states
  const [Device, setDevice] = useState(null);
  const [Types, setTypes] = useState([]);

  const token = localStorage.getItem("authUser");
  const serial = useParams().id;
  const mapHeight = 112;
  const groupSlug = "default";
  const displays = {
    no: "no",
    "5-inch": "5",
    "7-inch": "7",
    "10-inch": "10",
  };
  const speakers = [{ type: "no" }, { type: "mono" }, { type: "stereo" }];

  const getDisplayType = (value) =>
    Object.keys(displays).find((key) => displays[key] === value);

  const getDevice = async () => {
    const resObj = await fetchItem(devices, serial, token);

    if (resObj.status === HTTPSTATUS.ok) {
      setDevice(resObj.body);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  const getItems = async (url, setter) => {
    const resObj = await fetchItems(url, token);

    if (resObj.status === HTTPSTATUS.ok) {
      setter(resObj.body.results);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  useEffect(() => {
    getDevice();
    getItems(types, setTypes);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const saveEditInfo = async () => {
    const info = {
      serial: Device.serial,
      label: document.getElementById("lab1").value,
      product_name: document.getElementById("pro1").value,
      group: groupSlug,
      description: document.getElementById("des1").value,
      type: slugify(document.getElementById("typ1").value),
      display: displays[document.getElementById("dis1").value],
      speaker: document.getElementById("spk1").value,
      led_number: Number(document.getElementById("led1").value),
      microphone_number: Number(document.getElementById("mic1").value),
      lat: document.getElementById("lat1").value,
      long: document.getElementById("lng1").value,
    };

    const resObj = await patchItem(devices, Device.serial, token, info);

    if (resObj.status === HTTPSTATUS.ok) {
      Notify(
        "device inforamtion has updated successfuly",
        "Congrats",
        "success"
      );
      setDevice(resObj.body);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  if (!Device || !Types.length) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Edit device"
          purpose={`serial: ${Device.serial}${
            Device.label.length ? `, label: ${Device.label}` : ""
          }`}
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <div>
              <h5>Information</h5>
              <br></br>
              <Form>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label>Label</Label>
                      <Input
                        type="text"
                        defaultValue={Device.label}
                        className="form-control"
                        id="lab1"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Label>Product name</Label>
                      <Input
                        type="text"
                        defaultValue={Device.product_name}
                        className="form-control"
                        id="pro1"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label>Description</Label>
                      <Input
                        type="textarea"
                        rows={5}
                        defaultValue={Device.description}
                        className="form-control"
                        id="des1"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <SimpleMap
                        lat={Device.lat ? Device.lat : ""}
                        long={Device.long ? Device.long : ""}
                        height={mapHeight}
                      ></SimpleMap>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <br />
              <h5>Settings</h5>
              <br></br>
              <Form>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>Type</Label>
                      <select className="custom-select" id="typ1">
                        {getOptions(Types, Device.type, "name")}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>Display</Label>
                      <select className="custom-select" id="dis1">
                        {getOptions(
                          Object.keys(displays).map((key) => ({
                            type: key,
                          })),
                          getDisplayType(Device.display),
                          "type"
                        )}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>Speaker</Label>
                      <select className="custom-select" id="spk1">
                        {getOptions(speakers, Device.speaker, "type")}
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Number of leds</Label>
                      <Input
                        type="number"
                        defaultValue={Device.led_number}
                        className="form-control"
                        id="led1"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Number of microphones</Label>
                      <Input
                        type="number"
                        defaultValue={Device.microphone_number}
                        className="form-control"
                        id="mic1"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Latitude</Label>
                      <Input
                        type="text"
                        defaultValue={Device.lat}
                        className="form-control"
                        id="lat1"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Longitude</Label>
                      <Input
                        type="text"
                        defaultValue={Device.long}
                        className="form-control"
                        id="lng1"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <br></br>
              <CustomButton
                float="right"
                margin={10}
                handler={saveEditInfo}
                text="Save changes"
              ></CustomButton>
              <Link to={ROUTES.devices}>
                <CustomButton
                  float="right"
                  handler={() => {}}
                  text="Cancel"
                ></CustomButton>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default DeviceEdit;
