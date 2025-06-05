const { fetchAllUsers } = require("../models/users.models");

const getAllUsers = (request, response) => {
  fetchAllUsers().then((users) => response.status(200).send(users));
};

module.exports = { getAllUsers };
