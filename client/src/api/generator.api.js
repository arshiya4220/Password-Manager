import api from "./axios";

export const generatePassword = async (options) => {
  const res = await api.post("/generator", options);
  return res.data;
};