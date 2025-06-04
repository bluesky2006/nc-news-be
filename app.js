const express = require("express");
const app = express();
const db = require("./db/connection");
const endpoints = require("./endpoints.json");
const { getEndpoints } = require("./controllers");

// Simple response at root level
app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello!" });
});

// Respond with list of endpoints on /api
app.get("/api", getEndpoints);

module.exports = app;
