const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  const ip = req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const model = userAgent.match(/\((.*?)\)/);
  const data = {
    ip,
    userAgent,
    model,
  };
  res.json(data);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
