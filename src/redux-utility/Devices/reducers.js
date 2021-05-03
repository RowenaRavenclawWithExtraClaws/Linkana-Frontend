const editDevice = (state, action) => {
  state.value[action.payload.indx] = {
    ...state.value[action.payload.indx],
    ...action.payload.editData,
  };
};

const deleteDevice = (state, action) => {
  state.value = state.value.filter((device) => device.id !== action.payload);
};

const Reducers = {
  edit: editDevice,
  delete: deleteDevice,
};

export default Reducers;
