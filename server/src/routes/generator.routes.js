const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { generate } = require("../controllers/generator.controller");

router.post("/", authMiddleware, generate);

module.exports = router;