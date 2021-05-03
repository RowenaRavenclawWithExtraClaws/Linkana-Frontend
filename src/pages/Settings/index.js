import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ICONS from "../../components/Common/icons";
import VerticalNavBar from "../../components/Common/VerticalNavBar";
import { profile } from "../../helpers/endpoints";
import { HTTPSTATUS, Loader } from "../../helpers/utility";
import { fetchItem } from "../../helpers/requests_helper";
import { prettifyJsonStr } from "../../helpers/utility";
import Notify from "../../components/Common/notification";
import ProfileTab from "./Tabs/ProfileTab";
import CompanyTab from "./Tabs/CompanyTab";

export const Settings = () => {
  // tab state
  const [activeTab, switchTab] = useState(0);
  // data states
  const [Profile, setProfile] = useState(null);
  const [Company, setCompany] = useState(null);

  const token = localStorage.getItem("authUser");

  // title and icon for each tab
  const navObjects = [
    { title: "Profile", icon: ICONS.profileIcon },
    { title: "Company", icon: ICONS.companyIcon },
  ];

  const getItem = async (url, setter, thenFunc = () => {}) => {
    const resObj = await fetchItem(url, "", token);

    if (resObj.status === HTTPSTATUS.ok) {
      setter(resObj.body);
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    thenFunc(resObj.body);
  };

  useEffect(() => {
    getItem(`${profile}company/`, setCompany);
    getItem(profile, setProfile, (resBody) =>
      localStorage.setItem("avatar", resBody.profile_picture)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectView = () => {
    switch (activeTab) {
      case 0:
        return <ProfileTab token={token} Profile={Profile}></ProfileTab>;
      case 1:
        return <CompanyTab token={token} Company={Company}></CompanyTab>;
      default:
        return null;
    }
  };

  if (!Profile || !Company) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Settings"
          purpose="edit profile and company information"
        ></Breadcrumbs>
        <div className="checkout-tabs">
          <Row>
            <Col lg={2}>
              <VerticalNavBar
                navObjects={navObjects}
                activeTab={activeTab}
                switchTab={switchTab}
              ></VerticalNavBar>
            </Col>
            <Col lg={10}>{selectView()}</Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Settings;
