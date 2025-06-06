const db = require("../db/connection");
const checkTopicExists = require("../utils");

const selectAllArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortByQueries = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const validOrderQueries = ["asc", "desc"];

  if (
    !validSortByQueries.includes(sort_by) ||
    !validOrderQueries.includes(order)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid query" });
  }

  const queryValues = [];
  let queryString = `SELECT articles.*, COUNT(comments.comment_id)
      AS comment_count
      FROM articles
      LEFT JOIN comments
      ON comments.article_id = articles.article_id `;

  if (topic) {
    queryValues.push(topic);
    queryString += `WHERE articles.topic = $1 `;
  }

  return db
    .query(
      (queryString += `GROUP BY articles.article_id
    ORDER BY articles.${sort_by} ${order.toUpperCase()};`),
      queryValues
    )
    .then(({ rows }) => {
      const articlesWithCommentCount = rows.map(
        ({ comment_count, body, ...rest }) => {
          return {
            ...rest,
            comment_count: Number(comment_count),
          };
        }
      );

      return { articles: articlesWithCommentCount };
    });
};

const selectArticleByArticleId = (article_id) => {
  return db
    .query(
      `SELECT *
      FROM articles
      WHERE article_id = $1;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return { article: rows };
    });
};

const updateArticleVoteByArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return { article: rows };
    });
};

module.exports = {
  selectAllArticles,
  selectArticleByArticleId,
  updateArticleVoteByArticleId,
};
