const endpoints = require("./endpoints.json");
const { fetchAllTopics } = require("./models");

const getEndpoints = (request, response) => {
  response.status(200).send({ endpoints: endpoints });
};

const getAllTopics = (request, response) => {
  fetchAllTopics().then((topics) => response.status(200).send(topics));
};

module.exports = { getEndpoints, getAllTopics };
