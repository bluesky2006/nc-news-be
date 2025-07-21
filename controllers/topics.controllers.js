const { selectAllTopics } = require("../models/topics.models.js");

function getAllTopics(request, response) {
  selectAllTopics().then((topics) => response.status(200).send(topics));
}

module.exports = { getAllTopics };
