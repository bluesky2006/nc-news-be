const db = require("./db/connection");

function checkTopicExists(topic) {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1;`, [topic])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Topic not found" });
      }
      return;
    });
}

function checkCommentsExistByArticleId(article_id) {
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
}

function checkArticleExists(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
    });
}

function checkUserExists(username) {
  return db
    .query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "User not found",
        });
      }
    });
}

module.exports = {
  checkTopicExists,
  checkCommentsExistByArticleId,
  checkArticleExists,
  checkUserExists,
};
