import { createSlice } from "@reduxjs/toolkit";
import commands from "../../data/commands";
import Reducers from "./reducers";

const initialState = {
  value: commands,
  status: "idle",
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    create: Reducers.create,
    edit: Reducers.edit,
    deleteCommand: Reducers.delete,
  },
});

export const { create, edit, deleteCommand } = commandsSlice.actions;

export const selectCommands = (state) => state.commands.value;

export const selectSubCommands = (state) => state.commands.value.slice(0, 3);

export default commandsSlice.reducer;
