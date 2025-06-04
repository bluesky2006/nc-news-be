const express = require("express");
const app = express();
const db = require("./db/connection");
const endpoints = require("./endpoints.json");

// Simple response at root level
app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello!" });
});

// Respond with list of endpoints on /api
app.get("/api", (request, response) => {
  response.status(200).send({ endpoints: endpoints });
});

module.exports = app;
