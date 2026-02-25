import api from "./axios";

export const getSecurityHealth = async () => {
  const res = await api.get("/security");
  return res.data;
};