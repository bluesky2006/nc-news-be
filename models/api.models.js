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
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)
      AS comment_count
      FROM articles
      LEFT JOIN comments
      ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      const filteredArticles = rows.map(({ comment_count, ...rest }) => {
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

const fetchArticleByArticleId = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return { article: rows };
    });
};

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id 
      FROM comments 
      LEFT JOIN articles 
      ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      ORDER BY comments.created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return { comments: rows };
    });
};

module.exports = {
  fetchAllTopics,
  fetchAllArticles,
  fetchAllUsers,
  fetchArticleByArticleId,
  fetchCommentsByArticleId,
};
