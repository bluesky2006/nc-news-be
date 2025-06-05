const { selectAllTopics } = require("../models/topics.models.js");

const getAllTopics = (request, response) => {
  selectAllTopics().then((topics) => response.status(200).send(topics));
};

module.exports = { getAllTopics };
