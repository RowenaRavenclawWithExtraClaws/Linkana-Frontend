import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSubDevices } from "../../redux-utility/Devices/devicesSlice";
import { selectSubCommands } from "../../redux-utility/Commands/commandsSlice";
import { selectSubApps } from "../../redux-utility/Apps/appsSlice";
import { Container } from "reactstrap";
import { Responsive } from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { IconPickerItem } from "react-fa-icon-picker";
import "../../../node_modules/react-grid-layout/css/styles.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  formatDate,
  Loader,
  renderBadges,
  ResetLayout,
} from "../../helpers/utility";
import OverviewCard from "../../components/Common/Cards/OverviewCard";
import ResetLayoutModal from "../../components/Common/Modals/ResetLayoutModal";

const sectionCardHeight = 300;
// react-grid-layout default parameters;
const cardWidth = 6;
const cardHeight = 1;
const rowHeight = 364;
const layoutMargin = [10, 10];
const resizeHandles = ["e"];

const Dashboard = (props) => {
  // data states
  const devices = useSelector(selectSubDevices);
  const commands = useSelector(selectSubCommands);
  const apps = useSelector(selectSubApps);
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // modal states
  const [isResetModalOpen, toggleResetModal] = useState(false);

  const deviceTitles = ["serial", "label", "type", "created_at"];
  const commandTitles = ["title", "payload", "icon"];
  const appTitles = ["title", "description", "icon"];

  const getItems = async () =>
    /*url,
    setter,
    setCount = () => {},
    thenFunc = null,
    sliceRange = 0,
    cacheItems = () => {}*/
    {
      /*const resObj = await fetchItems(url, token);

    if (resObj.status === HTTPSTATUS.ok) {
      const slicedItems = resObj.body.results.slice(0, sliceRange);

      setter(slicedItems);
      setCount(resObj.body.count);

      cacheItems({ ...resObj.body, results: slicedItems });
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    if (thenFunc) thenFunc();*/
      setTimeout(() => toggleFetching(false), 1000);
    };

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //objects for storing device basic info values and visual props
  const basicInfo = [
    {
      name: "Devices",
      stateVar: devices.length,
      badgeClass: "success",
    },
    {
      name: "Errors",
      stateVar: 0,
      badgeClass: "danger",
    },
  ];

  const commandBasicInfo = [
    {
      name: "Commands",
      stateVar: commands.length,
      badgeClass: "success",
    },
  ];

  const appsBasicInfo = [
    {
      name: "Applications",
      stateVar: apps.length,
      badgeClass: "success",
    },
  ];

  // set of widgets to be rendered
  const cards = [
    (key) => (
      <div key={`wid_${key}`} className="grid-layout-card">
        <OverviewCard
          height={sectionCardHeight}
          color={""}
          invertedColor={""}
          title="LATEST REGISTERED DEVICES"
          noDataMessage="No devices registered yet!"
          items={devices}
          titles={deviceTitles}
          badges={renderBadges(basicInfo)}
          changeColorHandler={() => {}}
          formatLast={formatDate}
        ></OverviewCard>
      </div>
    ),
    (key) => (
      <div key={`wid_${key}`} className="grid-layout-card">
        <OverviewCard
          height={sectionCardHeight}
          color={""}
          invertedColor={""}
          title="LATEST CREATED COMMANDS"
          noDataMessage="No commands created yet!"
          items={commands}
          titles={commandTitles}
          badges={renderBadges(commandBasicInfo)}
          changeColorHandler={() => {}}
          formatLast={(command) => (
            <IconPickerItem
              icon={command.icon}
              size={12}
              color={command.color}
            />
          )}
        ></OverviewCard>
      </div>
    ),
    (key) => (
      <div key={`wid_${key}`} className="grid-layout-card">
        <OverviewCard
          height={sectionCardHeight}
          color={""}
          invertedColor={""}
          title="LATEST ENABELED APPLICATIONS"
          noDataMessage="No apps created yet!"
          items={apps}
          titles={appTitles}
          badges={renderBadges(appsBasicInfo)}
          changeColorHandler={() => {}}
          formatLast={(command) => (
            <IconPickerItem
              icon={command.icon}
              size={12}
              color={command.color}
            />
          )}
        ></OverviewCard>
      </div>
    ),
  ];

  // generate widget layouts dynamically
  const generateLayout = () =>
    cards.map((_, key) => ({
      // make exception for the deviceManagement card as it takes the whole width of the page
      i: `wid_${key}`,
      x: key === 0 ? 0 : ((key - 1) % 2) * cardWidth,
      y: key === 0 ? 0 : Math.ceil(key / 2),
      w: key === 0 ? cardWidth * 2 : cardWidth,
      minW: key === 0 ? 6 : 3,
      h: cardHeight,
    }));

  const [layouts, setLayouts] = useState({ lg: generateLayout() });

  const resetLayout = () => {
    setLayouts({ lg: generateLayout() });
    //setBackgroundColors([initialCardColor, initialCardColor, initialCardColor]);
  };

  const modals = [
    (key) => (
      <ResetLayoutModal
        key={`moda_${key}`}
        isOpen={isResetModalOpen}
        toggle={() => toggleResetModal(false)}
        okHandler={() => {
          toggleResetModal(false);
          resetLayout();
        }}
      ></ResetLayoutModal>
    ),
  ];

  const renderCards = () => cards.map((card, key) => card(key));

  if (fetching) return <Loader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Overview"
          purpose="a quick look on devices, commands and applications"
          action={
            <ResetLayout handler={() => toggleResetModal(true)}></ResetLayout>
          }
        ></Breadcrumbs>
        {/* render overview widgets in a responsive (resizable and draggable) layout */}
        <SizeMe>
          {({ size }) => (
            <Responsive
              width={size.width ? size.width : 10}
              rowHeight={rowHeight}
              margin={layoutMargin}
              layouts={layouts}
              resizeHandles={resizeHandles}
              isBounded={true}
              compactType="vertical"
              onLayoutChange={(_, layouts) => {
                setLayouts(layouts);
                //syncLayout();
              }}
            >
              {renderCards()}
            </Responsive>
          )}
        </SizeMe>
        {modals.map((modal, key) => modal(key))}
      </Container>
    </div>
  );
};

export default Dashboard;
