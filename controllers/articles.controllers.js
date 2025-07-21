const {
  selectAllArticles,
  selectArticleByArticleId,
  updateArticleVoteByArticleId,
} = require("../models/articles.models.js");
const db = require("../db/connection");

// const checkTopicExists = require("../utils.js");

function getAllArticles(request, response, next) {
  const { sort_by, order, topic } = request.query;

  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      response.status(200).send(articles);
    })
    .catch(next);
}

function getArticleByArticleId(request, response, next) {
  const { article_id } = request.params;
  selectArticleByArticleId(article_id)
    .then((article) => response.status(200).send(article))
    .catch(next);
}

function patchArticleVoteByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  if (Object.keys(request.body).length === 0) {
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Article not found" });
        }
        return response.status(200).send({
          article: rows[0],
        });
      })
      .catch(next);
  }
  updateArticleVoteByArticleId(article_id, inc_votes)
    .then((article) => response.status(200).send(article))
    .catch(next);
}

module.exports = {
  getAllArticles,
  getArticleByArticleId,
  patchArticleVoteByArticleId,
};
