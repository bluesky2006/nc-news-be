const endpoints = require("../endpoints.json");
const {
  fetchAllTopics,
  fetchAllArticles,
  fetchAllUsers,
  fetchArticleByArticleId,
  fetchCommentsByArticleId,
} = require("../models/api.models");

const getEndpoints = (request, response) => {
  response.status(200).send({ endpoints: endpoints });
};

const getAllTopics = (request, response) => {
  fetchAllTopics().then((topics) => response.status(200).send(topics));
};

const getAllArticles = (request, response) => {
  fetchAllArticles().then((articles) => response.status(200).send(articles));
};

const getAllUsers = (request, response) => {
  fetchAllUsers().then((users) => response.status(200).send(users));
};

const getArticleByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleByArticleId(article_id)
    .then((article) => response.status(200).send(article))
    .catch(next);
};

const getCommentsByArticleId = (request, response) => {
  const { article_id } = request.params;
  fetchCommentsByArticleId(article_id).then((comments) =>
    response.status(200).send(comments)
  );
};

module.exports = {
  getEndpoints,
  getAllTopics,
  getAllArticles,
  getAllUsers,
  getArticleByArticleId,
  getCommentsByArticleId,
};
