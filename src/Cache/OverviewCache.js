let latestDevices = {};
let latestCommands = {};
let latestApps = {};

export const getLatestDevices = () => latestDevices;
export const getLatestCommands = () => latestCommands;
export const getLatestApps = () => latestApps;

export const setLatestDevices = (devices) => (latestDevices = devices);
export const setLatestCommands = (commands) => (latestCommands = commands);
export const setLatestApps = (apps) => (latestApps = apps);
