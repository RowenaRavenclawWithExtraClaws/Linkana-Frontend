import { isArrEmpty } from "../helpers/utility";

let devices = [];

export const getCachedDevices = (page = 1) => {
  if (isArrEmpty(devices)) return {};

  return devices[page - 1];
};

export const setCachedDevices = (data) => devices.push(data);
