const express = require("express");
const cors = require("cors");
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
  patchArticleVoteByArticleId,
} = require("./controllers/articles.controllers");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentByCommentId,
} = require("./controllers/comments.controllers");
const { getAllTopics } = require("./controllers/topics.controllers");
const { getAllUsers } = require("./controllers/users.controllers");

app.use(cors());

app.use(express.json());

// index.html on /
app.use("/", express.static("public"));

// Respond with list of endpoints on /api
// app.use("/api", express.static("public"));

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

// Patches an article's vote property by article_id on /api/articles/:article_id
app.patch("/api/articles/:article_id", patchArticleVoteByArticleId);

// Deletes a comment by its comment_id on /api/comments/:comment_id
app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerError);

module.exports = app;
