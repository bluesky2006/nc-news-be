const express = require("express");
const articlesRouter = express.Router();

const {
  getAllArticles,
  getArticleByArticleId,
  patchArticleVoteByArticleId,
} = require("../controllers/articles.controllers");

const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/comments.controllers");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleId)
  .patch(patchArticleVoteByArticleId);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
