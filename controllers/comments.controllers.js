const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  dBdeleteCommentByCommentId,
} = require("../models/comments.models.js");

const getCommentsByArticleId = (request, response) => {
  const { article_id } = request.params;
  selectCommentsByArticleId(article_id).then((comments) =>
    response.status(200).send(comments)
  );
};

const postCommentByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { author, body } = request.body;
  insertCommentByArticleId(article_id, author, body)
    .then((comment) => response.status(201).send(comment))
    .catch(next);
};

const deleteCommentByCommentId = (request, response, next) => {
  const { comment_id } = request.params;
  dBdeleteCommentByCommentId(comment_id)
    .then(() => response.status(204).send())
    .catch(next);
};

module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentByCommentId,
};
