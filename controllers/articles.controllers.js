const {
  fetchAllArticles,
  fetchArticleByArticleId,
} = require("../models/articles.models.js");

const getAllArticles = (request, response) => {
  fetchAllArticles().then((articles) => response.status(200).send(articles));
};

const getArticleByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleByArticleId(article_id)
    .then((article) => response.status(200).send(article))
    .catch(next);
};

module.exports = { getAllArticles, getArticleByArticleId };
