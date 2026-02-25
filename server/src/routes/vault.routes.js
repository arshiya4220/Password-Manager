const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  addPassword,
  getPasswords,
  decryptPassword,
  toggleFavorite,
  getFavorites,
  getRecent
} = require("../controllers/vault.controller");

router.post("/", authMiddleware, addPassword);
router.get("/", authMiddleware, getPasswords);
router.get("/:id/decrypt", authMiddleware, decryptPassword);
router.patch("/:id/favorite", authMiddleware, toggleFavorite);
router.get("/favorites", authMiddleware, getFavorites);
router.get("/recent", authMiddleware, getRecent);
module.exports = router;