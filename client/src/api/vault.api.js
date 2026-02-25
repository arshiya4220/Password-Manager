import api from "./axios";

export const getVault = async (folderId) => {
  const res = await api.get("/vault", {
    params: { folderId },
  });
  return res.data;
};

export const addPassword = async (data) => {
  const res = await api.post("/vault", data);
  return res.data;
};

export const decryptPassword = async (id) => {
  const res = await api.get(`/vault/${id}/decrypt`);
  return res.data;
};

export const toggleFavorite = async (id) => {
  const res = await api.patch(`/vault/${id}/favorite`);
  return res.data;
};
export const getFavorites = async () => {
  const res = await api.get("/vault/favorites");
  return res.data;
};
export const getRecent = async () => {
  const res = await api.get("/vault/recent");
  return res.data;
};