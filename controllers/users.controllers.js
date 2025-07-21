const { selectAllUsers } = require("../models/users.models");

function getAllUsers(request, response) {
  selectAllUsers().then((users) => response.status(200).send(users));
}

module.exports = { getAllUsers };
