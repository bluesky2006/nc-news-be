const {
  selectAllArticles,
  selectArticleByArticleId,
  updateArticleVoteByArticleId,
} = require("../models/articles.models.js");

const getAllArticles = (request, response, next) => {
  const { sort_by, order, topic } = request.query;
  selectAllArticles(sort_by, order, topic)
    .then((articles) => response.status(200).send(articles))
    .catch(next);
};

const getArticleByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  selectArticleByArticleId(article_id)
    .then((article) => response.status(200).send(article))
    .catch(next);
};

const patchArticleVoteByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  updateArticleVoteByArticleId(article_id, inc_votes)
    .then((article) => response.status(202).send(article))
    .catch(next);
};

module.exports = {
  getAllArticles,
  getArticleByArticleId,
  patchArticleVoteByArticleId,
};
