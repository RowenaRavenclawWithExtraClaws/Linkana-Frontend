import { createSlice } from "@reduxjs/toolkit";
import devices from "../../data/devices";
import Reducers from "./reducers";

const initialState = {
  value: devices,
  status: "idle",
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    edit: Reducers.edit,
    deleteDevice: Reducers.delete,
  },
});

export const { edit, deleteDevice } = devicesSlice.actions;

export const selectDevices = (state) => state.devices.value;

export const selectSubDevices = (state) => state.devices.value.slice(0, 3);

export default devicesSlice.reducer;
