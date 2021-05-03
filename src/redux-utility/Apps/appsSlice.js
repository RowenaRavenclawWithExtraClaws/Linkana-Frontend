import { createSlice } from "@reduxjs/toolkit";
import apps from "../../data/apps";
import Reducers from "./reducers";

const initialState = {
  value: apps,
  status: "idle",
};

export const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    create: Reducers.create,
    edit: Reducers.edit,
    deleteApp: Reducers.delete,
  },
});

export const { create, edit, deleteApp } = appsSlice.actions;

export const selectApps = (state) => state.apps.value;

export const selectSubApps = (state) => state.apps.value.slice(0, 3);

export const selectEnabledApps = (state) =>
  state.apps.value.filter((app) => app.is_enabled);

export const selectDisabledApps = (state) =>
  state.apps.value.filter((app) => !app.is_enabled);

export default appsSlice.reducer;
