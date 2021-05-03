import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";
import { selectDevices } from "../../redux-utility/Devices/devicesSlice";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import NoData from "../../components/Common/NoData";
import ItemCount from "../../components/Common/ItemCount";
import { Loader } from "../../helpers/utility";
import InteractiveMap from "./Map/Map";

const Interactions = () => {
  // data states
  const devices = useSelector(selectDevices);
  // loading state
  const [fetching, toggleFetching] = useState(true);

  const [onCount, setOnCount] = useState(0);
  const [offCount, setOffCount] = useState(0);

  const getDevices = async () => {
    /*const resObj = await fetchItems(devices, token);

    if (resObj.status === HTTPSTATUS.ok) {
      setDevices(resObj.body.results.filter((device) => device.lat !== null));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);*/
    setTimeout(() => toggleFetching(false), 1000);
  };

  useEffect(() => {
    getDevices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Interactions"
          purpose="an interactive map to track your device interactions"
          buttons={[
            <ItemCount
              key="it_0"
              badgeClass={"secondary"}
              name={"Offline"}
              count={offCount}
              float="right"
            ></ItemCount>,
            <ItemCount
              key="it_1"
              badgeClass={"success"}
              name={"Online"}
              count={onCount}
              float="right"
            ></ItemCount>,
          ]}
        ></Breadcrumbs>
        {devices.length ? (
          <InteractiveMap
            Devices={devices}
            setOffCount={setOffCount}
            setOnCount={setOnCount}
          ></InteractiveMap>
        ) : (
          <NoData message="No device with location data availbale"></NoData>
        )}
      </Container>
    </div>
  );
};

export default Interactions;
