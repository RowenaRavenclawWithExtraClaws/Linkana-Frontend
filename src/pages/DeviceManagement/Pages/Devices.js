import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CustomButton from "../../../components/Common/customButton";
import RegisterDevcieModal from "../../../components/Common/Modals/RegisterDeviceModal";
import { Loader, SearchField, VerticalSpace } from "../../../helpers/utility";
import ActiveDevicesTab from "../Tabs/ActiveDevicesTab";

const Devices = () => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  const [Types] = useState([]);
  // modal states
  const [isRegisterDeviceModalOpen, toggleRegisterDeviceModal] = useState(
    false
  );
  // passed search word state
  const [searchWord, setSearchWord] = useState(null);

  const token = localStorage.getItem("authUser");

  const getItems = async (/*url, setter, thenFunc = null*/) => {
    /*const resObj = await fetchItems(url, token);

    if (resObj.status === HTTPSTATUS.ok) {
      setter(resObj.body.results);
      setCachedTypes(resObj.body);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    if (thenFunc) thenFunc();*/
    setTimeout(() => toggleFetching(false), 1000);
  };

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const modals = [
    (key) => (
      <RegisterDevcieModal
        key={`moda_${key}`}
        Types={Types}
        isOpen={isRegisterDeviceModalOpen}
        toggle={() => toggleRegisterDeviceModal(false)}
        token={token}
      ></RegisterDevcieModal>
    ),
  ];

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Devices"
          purpose="view device information, enable or disable a device and more"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <SearchField
              field="label"
              setSearchWord={setSearchWord}
            ></SearchField>
            <CustomButton
              id="devices_register"
              title="copy register-device command"
              float="right"
              handler={() => toggleRegisterDeviceModal(true)}
              text="Register Device"
            ></CustomButton>
            <VerticalSpace></VerticalSpace>
            <ActiveDevicesTab token={token} searchWord={searchWord} />
          </CardBody>
        </Card>
        {modals.map((modal, key) => modal(key))}
      </Container>
    </div>
  );
};

export default Devices;
