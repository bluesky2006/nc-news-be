const express = require("express");
const app = express();
const db = require("./db/connection");
const { getEndpoints, getAllTopics } = require("./controllers");

// Simple response at root level
app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello!" });
});

// Respond with list of endpoints on /api
app.get("/api", getEndpoints);

// Respond with list of topics on /api/topics
app.get("/api/topics", getAllTopics);

module.exports = app;
