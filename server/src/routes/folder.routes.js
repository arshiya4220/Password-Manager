const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createFolder,
  getFolders,
} = require("../controllers/folder.controller");

router.post("/", authMiddleware, createFolder);
router.get("/", authMiddleware, getFolders);

module.exports = router;