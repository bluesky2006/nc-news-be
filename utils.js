const db = require("./db/connection");

const checkTopicExists = (topic) => {
  return db
    .query("SELECT * FROM topics WHERE slug = $1", [topic])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Topic not found" });
      }
    });
};

module.exports = checkTopicExists;
