const express = require("express");
const app = express();

const {
  getEndpoints,
  getAllTopics,
  getAllArticles,
  getAllUsers,
  getArticleByArticleId,
} = require("./controllers/controllers");

// Simple response at root level
app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello!" });
});

// Respond with list of endpoints on /api
app.get("/api", getEndpoints);

// Respond with list of topics on /api/topics
app.get("/api/topics", getAllTopics);

// Respond with list of articles on /api/articles
app.get("/api/articles", getAllArticles);

// Respond with list of users on /api/users
app.get("/api/users", getAllUsers);

// Respond with a specific article on /api/articles/:article_id
app.get("/api/articles/:article_id", getArticleByArticleId);

module.exports = app;
