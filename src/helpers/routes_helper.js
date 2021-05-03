const ROUTES = {
  overview: "/overview",
  devices: "/device-management/devices",
  devcieEdit: "/device-management/devices/edit/:id",
  deviceInfo: "/device-management/devices/information/:id",
  groupDevices: "/device-management/groups/devices",
  monitoring: "/resource-monitoring/devices",
  metrics: "/resource-monitoring/devices/metrics/:id",
  remoteCommands: "/remote-commands/devices",
  commands: "/remote-commands/commands",
  commandHistory: "/remote-commands/commands/history/:id",
  terminal: "/remote-control/terminal/:id",
  apps: "/applications",
  appControl: "/applications/control/:id",
  digitalAssistants: "/digital-assistants/ai-testing",
  interactions: "/interactions",
  userManage: "/user-management",
  userGuide: "/user-guide",
  settings: "/settings",
};

export default ROUTES;
