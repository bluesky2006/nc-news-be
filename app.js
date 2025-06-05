const express = require("express");
const app = express();
const {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerError,
} = require("./middleware/error-handler");
const { getEndpoints } = require("./controllers/api.controllers");
const {
  getAllArticles,
  getArticleByArticleId,
} = require("./controllers/articles.controllers");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./controllers/comments.controllers");
const { getAllTopics } = require("./controllers/topics.controllers");
const { getAllUsers } = require("./controllers/users.controllers");

app.use(express.json());

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

// Respond with all comments related to an article_id on /api/articles/:article_id/comments
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

// Posts a comment related to an article_id on /api/articles/:article_id/comments
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerError);

module.exports = app;
