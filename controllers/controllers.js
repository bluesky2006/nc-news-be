const endpoints = require("../endpoints.json");
const { fetchAllTopics, fetchAllArticles } = require("../models/models");

const getEndpoints = (request, response) => {
  response.status(200).send({ endpoints: endpoints });
};

const getAllTopics = (request, response) => {
  fetchAllTopics().then((topics) => response.status(200).send(topics));
};

const getAllArticles = (request, response) => {
  fetchAllArticles().then((articles) => response.status(200).send(articles));
};

module.exports = { getEndpoints, getAllTopics, getAllArticles };
