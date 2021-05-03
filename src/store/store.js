import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "../redux-utility/Devices/devicesSlice";
import appReducer from "../redux-utility/Apps/appsSlice";
import commandsReducer from "../redux-utility/Commands/commandsSlice";

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    apps: appReducer,
    commands: commandsReducer,
  },
});
