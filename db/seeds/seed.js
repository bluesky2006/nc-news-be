const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createLookupMap } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return (
    db
      .query(`DROP TABLE IF EXISTS comments;`)
      .then(() => db.query(`DROP TABLE IF EXISTS articles;`))
      .then(() => db.query(`DROP TABLE IF EXISTS users;`))
      .then(() => db.query(`DROP TABLE IF EXISTS topics;`))
      .then(() =>
        db.query(
          `CREATE TABLE topics (
          slug VARCHAR(128) PRIMARY KEY, 
          description VARCHAR(64), 
          img_url VARCHAR(1000)
        );`
        )
      )
      .then(() =>
        db.query(
          `CREATE TABLE users (
          username VARCHAR(128) PRIMARY KEY, 
          name VARCHAR(128) NOT NULL, 
          avatar_url VARCHAR(1000)
        );`
        )
      )
      .then(() =>
        db.query(
          `CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY, 
          title VARCHAR(128) NOT NULL, 
          topic VARCHAR(128) REFERENCES topics(slug), 
          author VARCHAR(128) REFERENCES users(username), 
          body TEXT NOT NULL, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
          votes INT DEFAULT 0, 
          article_img_url VARCHAR(1000)
        );`
        )
      )
      .then(() =>
        db.query(
          `CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          article_id INTEGER REFERENCES articles(article_id) NOT NULL,
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author VARCHAR(128) REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
        )
      )

      // Insert Topics
      .then(() => {
        const topicInsertData = topicData.map(
          ({ slug, description, img_url }) => [slug, description, img_url]
        );
        const insertTopicsQuery = format(
          `INSERT INTO topics(slug, description, img_url) VALUES %L RETURNING *`,
          topicInsertData
        );
        return db.query(insertTopicsQuery);
      })

      // Insert Users
      .then(() => {
        const userInsertData = userData.map(
          ({ username, name, avatar_url }) => [username, name, avatar_url]
        );
        const insertUsersQuery = format(
          `INSERT INTO users(username, name, avatar_url) VALUES %L RETURNING *`,
          userInsertData
        );
        return db.query(insertUsersQuery);
      })

      // Insert Articles
      .then(() => {
        const articlesWithDates = articleData.map(convertTimestampToDate);
        const articleInsertData = articlesWithDates.map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            votes,
            article_img_url,
          }) => [title, topic, author, body, created_at, votes, article_img_url]
        );
        const insertArticlesQuery = format(
          `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
          articleInsertData
        );
        return db.query(insertArticlesQuery);
      })

      // Insert Comments
      .then((insertedArticles) => {
        const commentsWithDates = commentData.map(convertTimestampToDate);
        const articleTitleToIdMap = createLookupMap(
          insertedArticles.rows,
          "title",
          "article_id"
        );
        const commentInsertData = commentsWithDates.map(
          ({ article_title, body, votes, author, created_at }) => {
            const article_id = articleTitleToIdMap[article_title];
            return [article_id, body, votes, author, created_at];
          }
        );
        const insertCommentsQuery = format(
          `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L RETURNING *`,
          commentInsertData
        );
        return db.query(insertCommentsQuery);
      })
      .then((insertedComments) => insertedComments.rows)
  );
};

module.exports = seed;
