const createCommand = (state, action) => {
  const commands = state.value;
  commands.push({ ...action.payload, id: commands.length + 1 });
  state.value = commands;
};

const editCommand = (state, action) => {
  state.value[action.payload.id - 1] = {
    ...state.value[action.payload.id - 1],
    ...action.payload,
  };
};

const deleteCommand = (state, action) => {
  state.value = state.value.filter((command) => command.id !== action.payload);
};

const Reducers = {
  create: createCommand,
  edit: editCommand,
  delete: deleteCommand,
};

export default Reducers;
