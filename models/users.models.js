const db = require("../db/connection");

function selectAllUsers() {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return { users: rows };
  });
}

module.exports = { selectAllUsers };
