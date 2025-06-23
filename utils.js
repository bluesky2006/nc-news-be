const db = require("./db/connection");

const checkTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1;`, [topic])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Topic not found" });
      }
      return;
    });
};

const checkCommentsExistByArticleId = (article_id) => {
  return db
    .query(
      `SELECT EXISTS (
        SELECT 1
        FROM comments
        WHERE article_id = $1
      );`,
      [article_id]
    )
    .then((result) => {
      return result.rows[0].exists;
    });
};

module.exports = { checkTopicExists, checkCommentsExistByArticleId };
