import React from "react";
import { Redirect } from "react-router-dom";
import ROUTES from "../helpers/routes_helper";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import ResetPassword from "../pages/Authentication/ResetPassword";
import ConfirmedEmail from "../pages/Authentication/ConfirmedEmail";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import DeviceManagement from "../pages/DeviceManagement/index";
import DeviceInfo from "../pages/DeviceManagement/SubPages/DeviceInfo";
import DeviceEdit from "../pages/DeviceManagement/SubPages/DeviceEdit";
import GroupDevices from "../pages/DeviceManagement/SubPages/GroupDevices";
import MonitoringDevices from "../pages/ResourceMonitoring/index";
import Metrics from "../pages/ResourceMonitoring/Metrics/Metrics";
import RemoteCommands from "../pages/RemoteCommands/index";
import Commands from "../pages/RemoteCommands/Pages/Commands";
import CommandHistory from "../pages/RemoteCommands/SubPages/CommandHistory";
import Terminal from "../pages/RemoteControl/Terminal/Terminal";
import Applications from "../pages/Applications/index";
import AppsOnDevices from "../pages/Applications/SubPages/AppsOnDevices";
import AITest from "../pages/DigitalAssistants/index";
import Interactions from "../pages/Interactions/index";
import UserManagement from "../pages/UserManagement/index";
import UserGuide from "../pages/UserGuide/index";
import Settings from "../pages/Settings/index";
import Pages404 from "../pages/NotFound/pages-404";

const userRoutes = [
  { path: "/", component: Dashboard },
  { path: ROUTES.overview, component: Dashboard },
  { path: ROUTES.devices, component: DeviceManagement },
  { path: ROUTES.devcieEdit, component: DeviceEdit },
  { path: ROUTES.deviceInfo, component: DeviceInfo },
  { path: ROUTES.groupDevices, component: GroupDevices },
  { path: ROUTES.monitoring, component: MonitoringDevices },
  { path: ROUTES.metrics, component: Metrics },
  { path: ROUTES.remoteCommands, component: RemoteCommands },
  { path: ROUTES.commands, component: Commands },
  { path: ROUTES.commandHistory, component: CommandHistory },
  { path: ROUTES.terminal, component: Terminal },
  { path: ROUTES.apps, component: Applications },
  { path: ROUTES.appControl, component: AppsOnDevices },
  { path: ROUTES.digitalAssistants, component: AITest },
  { path: ROUTES.interactions, component: Interactions },
  { path: ROUTES.userManage, component: UserManagement },
  { path: ROUTES.userGuide, component: UserGuide },
  { path: ROUTES.settings, component: Settings },
  { path: "*", component: Pages404 },

  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: () => <Redirect to={ROUTES.overview} />,
  },
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPassword },
  { path: "/register", component: Register },
  { path: "/to-be-set", component: ResetPassword }, // the route is incorrect
  { path: "/to-be-set", component: ConfirmedEmail }, // the route is incorrect
];

export { userRoutes, authRoutes };
