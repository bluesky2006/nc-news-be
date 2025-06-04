const db = require("./db/connection");

const fetchAllTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    const filteredTopics = rows.map((topic) => {
      const { img_url, ...rest } = topic;
      return rest;
    });
    return { topics: filteredTopics };
  });
};

module.exports = { fetchAllTopics };
