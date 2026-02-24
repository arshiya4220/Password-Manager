const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { securityHealth } = require("../controllers/security.controller");

router.get("/", authMiddleware, securityHealth);

module.exports = router;