const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  addPassword,
  getPasswords,
  decryptPassword,
} = require("../controllers/vault.controller");

router.post("/", authMiddleware, addPassword);
router.get("/", authMiddleware, getPasswords);
router.get("/:id/decrypt", authMiddleware, decryptPassword);

module.exports = router;