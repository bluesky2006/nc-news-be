import db from "./connection.js";

function queryAllUsers() {
  return db.query("SELECT username FROM users").then((result) => result);
}

function queryCodingArticles() {
  return db
    .query("SELECT * FROM articles WHERE topic = 'coding'")
    .then((result) => result);
}

function queryCommentsLessThanZeroVotes() {
  return db
    .query("SELECT * FROM comments WHERE votes < 0")
    .then((result) => result);
}

function queryAllTopics() {
  return db.query("SELECT slug FROM topics").then((result) => result);
}

function queryArticlesByUser() {
  return db
    .query("SELECT title FROM articles WHERE author = 'grumpy19'")
    .then((result) => result);
}

function queryCommentsMoreThanTenVotes() {
  return db
    .query("SELECT * FROM comments WHERE votes > 10")
    .then((result) => result);
}

const result = await queryCommentsMoreThanTenVotes();
console.log(result.rows);
