const db = require("../db/connection");
const { checkTopicExists } = require("../utils");

const selectAllArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortByQueries = [
    "author",
    "title",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrderQueries = ["asc", "desc"];

  if (!validSortByQueries.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by query" });
  }
  if (!validOrderQueries.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  let queryValues = [];
  let queryString = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT  
    AS comment_count
    FROM articles
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id
  `;

  if (topic) {
    return checkTopicExists(topic)
      .then(() => {
        queryValues.push(topic);
        queryString += `WHERE articles.topic = $1 `;
        queryString += `
        GROUP BY articles.article_id
        ORDER BY articles.${sort_by} ${order.toUpperCase()};
      `;
        return db.query(queryString, queryValues);
      })
      .then(({ rows }) => {
        const articles = rows.map(({ body, ...rest }) => ({ ...rest }));
        return { articles };
      });
  } else {
    queryString += `
      GROUP BY articles.article_id
      ORDER BY articles.${sort_by} ${order.toUpperCase()};
    `;
    return db.query(queryString, queryValues).then(({ rows }) => {
      const articles = rows.map(({ body, ...rest }) => ({ ...rest }));
      return { articles: articles };
    });
  }
};

const selectArticleByArticleId = (article_id) => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url
      FROM articles
      WHERE articles.article_id = $1;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return { article: rows[0] };
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
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return { article: rows[0] };
    });
};

module.exports = {
  selectAllArticles,
  selectArticleByArticleId,
  updateArticleVoteByArticleId,
};
