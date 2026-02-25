import api from "./axios";

export const getFolders = async () => {
  const res = await api.get("/folders");
  return res.data;
};

export const createFolder = async (data) => {
  const res = await api.post("/folders", data);
  return res.data;
};