import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { useSelector } from "react-redux";
import {
  selectEnabledApps,
  selectDisabledApps,
} from "../../redux-utility/Apps/appsSlice";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CustomButton from "../../components/Common/customButton";
import CreateAppModal from "../../components/Common/Modals/CreateAppModal";
import NavigationBar from "../../components/Common/NavigationBar";
import { Loader, SearchField, VerticalSpace } from "../../helpers/utility";
import AppsTab from "./Tabs/AppsTab";

const Applications = () => {
  // data states
  const activeApps = useSelector(selectEnabledApps);
  const inactiveApps = useSelector(selectDisabledApps);
  // loading state
  const [fetching, toggleFetching] = useState(true);

  const [Types] = useState([]);
  // tab state
  const [activeTab, switchTab] = useState("0");
  // modal state
  const [isCreateAppModalOpen, toggleCreateAppModal] = useState(false);
  // passed search word state
  const [searchWord, setSearchWord] = useState(null);

  const token = localStorage.getItem("authUser");
  const tabTitles = ["Active applications", "Inactive applications"];

  const getApps = async () => {
    /*const resObj = await fetchItems(apps, token);

    if (resObj.status === HTTPSTATUS.ok) {
      setActiveApps(resObj.body.results.filter((app) => app.active === true));
      setInactiveApps(
        resObj.body.results.filter((app) => app.active === false)
      );
      activeAppsBackup.current = resObj.body.results.filter(
        (app) => app.active === true
      );
      inactiveAppsBackup.current = resObj.body.results.filter(
        (app) => app.active === false
      );
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);*/
    setTimeout(() => toggleFetching(false), 1000);
  };

  useEffect(() => {
    /*if (typeof searchWord === "string") {
      searchHandler(searchWord);
      return;
    }*/

    getApps();
  }, [searchWord]); // eslint-disable-line react-hooks/exhaustive-deps

  const modals = [
    (key) => (
      <CreateAppModal
        key={`moda_${key}`}
        Apps={inactiveApps}
        Types={Types}
        isOpen={isCreateAppModalOpen}
        token={token}
        toggle={() => toggleCreateAppModal(false)}
        setApps={() => {}}
      ></CreateAppModal>
    ),
  ];

  /*const searchHandler = (searchWord) => {
    if (activeTab === "0")
      setActiveApps(
        activeAppsBackup.current.filter((app) =>
          app.title.toLowerCase().includes(searchWord.toLowerCase())
        )
      );
    else {
      setInactiveApps(
        inactiveAppsBackup.current.filter((app) =>
          app.title.toLowerCase().includes(searchWord.toLowerCase())
        )
      );
    }
  };*/

  const resetAndSwitchTab = (tab) => switchTab(tab);

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Applications"
          purpose="create, enable, disable apps and more"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <SearchField
              field="title"
              setSearchWord={setSearchWord}
            ></SearchField>
            <CustomButton
              id="apps_create"
              title="create new application"
              float="right"
              handler={() => toggleCreateAppModal(true)}
              text="Create app"
            ></CustomButton>
            <VerticalSpace></VerticalSpace>
            <NavigationBar
              titles={tabTitles}
              activeTab={activeTab}
              switchTab={resetAndSwitchTab}
            ></NavigationBar>
            {activeTab === "0" ? (
              <AppsTab
                Apps={activeApps}
                ActiveApps={activeApps}
                InactiveApps={inactiveApps}
                Types={Types}
                token={token}
                activeTab={activeTab}
                setActiveApps={() => {}}
                setInactiveApps={() => {}}
              ></AppsTab>
            ) : (
              <AppsTab
                Apps={inactiveApps}
                ActiveApps={activeApps}
                InactiveApps={inactiveApps}
                Types={Types}
                token={token}
                activeTab={activeTab}
                setActiveApps={() => {}}
                setInactiveApps={() => {}}
              ></AppsTab>
            )}
          </CardBody>
        </Card>
        {modals.map((modal, key) => modal(key))}
      </Container>
    </div>
  );
};

export default Applications;
