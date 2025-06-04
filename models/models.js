const db = require("../db/connection");

const fetchAllTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    const filteredTopics = rows.map(({ img_url, ...rest }) => rest);
    return { topics: filteredTopics };
  });
};

const fetchAllArticles = () => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id)
      AS comment_count
      FROM articles
      LEFT JOIN comments
      ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      const filteredArticles = rows.map(({ body, comment_count, ...rest }) => {
        return {
          ...rest,
          comment_count: Number(comment_count),
        };
      });

      return { articles: filteredArticles };
    });
};

const fetchAllUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => {
    return { users: rows };
  });
};

module.exports = { fetchAllTopics, fetchAllArticles, fetchAllUsers };
