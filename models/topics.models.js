const db = require("../db/connection");

function selectAllTopics() {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    const filteredTopics = rows.map(({ img_url, ...rest }) => rest);
    return { topics: filteredTopics };
  });
}

module.exports = { selectAllTopics };
