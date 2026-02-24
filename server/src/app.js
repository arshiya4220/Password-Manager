const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const folderRoutes = require("./routes/folder.routes");
const vaultRoutes = require("./routes/vault.routes");
const generatorRoutes = require("./routes/generator.routes");
const securityRoutes = require("./routes/security.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/vault", vaultRoutes);
app.use("/api/generator", generatorRoutes);
app.use("/api/security", securityRoutes);
module.exports = app;