const db = require("../db/connection");
const { checkCommentsExistByArticleId } = require("../utils");

const selectCommentsByArticleId = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return checkCommentsExistByArticleId(article_id);
    })
    .then((hasComments) => {
      if (!hasComments) {
        return [];
      }
      return db
        .query(
          `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id 
          FROM comments 
          WHERE article_id = $1
          ORDER BY created_at DESC;`,
          [article_id]
        )
        .then(({ rows }) => ({ comments: rows }));
    });
};

const insertCommentByArticleId = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return { comment: rows[0] };
    });
};

const dBdeleteCommentByCommentId = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return { comments: rows };
    });
};

module.exports = {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  dBdeleteCommentByCommentId,
};
