const db = require("../db/connection");

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
      return { comments: rows[0] };
    });
};

const pushCommentByArticleId = (article_id, author, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [article_id, author, body]
    )
    .then(({ rows }) => {
      return { comment: rows[0] };
    });
};

module.exports = { fetchCommentsByArticleId, pushCommentByArticleId };
