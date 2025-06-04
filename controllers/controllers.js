const endpoints = require("../endpoints.json");
const {
  fetchAllTopics,
  fetchAllArticles,
  fetchAllUsers,
} = require("../models/models");

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

module.exports = { getEndpoints, getAllTopics, getAllArticles, getAllUsers };
