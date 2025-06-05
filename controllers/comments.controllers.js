const {
  fetchCommentsByArticleId,
  pushCommentByArticleId,
} = require("../models/comments.models.js");

const getCommentsByArticleId = (request, response) => {
  const { article_id } = request.params;
  fetchCommentsByArticleId(article_id).then((comments) =>
    response.status(200).send(comments)
  );
};

const postCommentByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { author, body } = request.body;
  pushCommentByArticleId(article_id, author, body)
    .then((comment) => response.status(201).send(comment))
    .catch(next);
};

module.exports = { getCommentsByArticleId, postCommentByArticleId };
