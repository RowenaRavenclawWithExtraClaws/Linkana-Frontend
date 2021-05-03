const createApp = (state, action) => {
  const apps = state.value;
  apps.push({ ...action.payload, id: apps.length + 1 });
  state.value = apps;
};

const editApp = (state, action) => {
  state.value[action.payload.id - 1] = {
    ...state.value[action.payload.id - 1],
    ...action.payload,
  };
};

const deleteApp = (state, action) => {
  state.value = state.value.filter((app) => app.id !== action.payload);
};

const Reducers = {
  create: createApp,
  edit: editApp,
  delete: deleteApp,
};

export default Reducers;
