const endpoints = require("../endpoints.json");

// const getRoot = (request, response) => {
//   response.status(200).send({ msg: "Hello!" });
// };

const getEndpoints = (request, response) => {
  response.status(200).send({ endpoints: endpoints });
};

module.exports = { getEndpoints };
