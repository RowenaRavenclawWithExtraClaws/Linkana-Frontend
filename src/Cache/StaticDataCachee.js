let types = {};
let services = {};

export const getCachedTypes = () => types;
export const getCachedServices = () => services;

export const setCachedTypes = (data) => (types = data);
export const setCachedServices = (data) => (services = data);
