const express = require("express");
const cors = require("cors");
const app = express();
const {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerError,
} = require("./middleware/error-handler");
const apiRouter = require("./routes/api-router");

app.use(cors());
app.use(express.json());

app.use("/", express.static("public"));
app.use("/api", apiRouter);

app.use(handlePostgresErrors);
app.use(handleCustomErrors);
app.use(handleServerError);

module.exports = app;
