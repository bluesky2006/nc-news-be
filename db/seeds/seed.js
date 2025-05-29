const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, getArticleID } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  // drop tables in reverse order from the way they were set up (?)
  return db.query(`DROP TABLE IF EXISTS comments;`).then(() => {
    return db.query(`DROP TABLE IF EXISTS articles;`).then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
        return db.query(`DROP TABLE IF EXISTS topics;`).then(() => {
          return db
            .query(
              `CREATE TABLE topics (
              slug VARCHAR(128) PRIMARY KEY, 
              description VARCHAR(64), 
              img_url VARCHAR(1000)
              );`
            )
            .then(() => {
              return db
                .query(
                  `CREATE TABLE users (
                  username VARCHAR(128) PRIMARY KEY, 
                  name VARCHAR(128) NOT NULL, 
                  avatar_url VARCHAR(1000)
                  );`
                )
                .then(() => {
                  return db
                    .query(
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
                    .then(() => {
                      return db
                        .query(
                          `CREATE TABLE comments (
                          comment_id SERIAL PRIMARY KEY,
	                        article_id INTEGER REFERENCES articles(article_id) NOT NULL,
	                        body TEXT NOT NULL,
	                        votes INT DEFAULT 0,
	                        author VARCHAR(128) REFERENCES users(username),
	                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                          );`
                        )
                        .then(() => {
                          const formattedTopicValues = topicData.map(
                            ({ slug, description, img_url }) => {
                              return [slug, description, img_url];
                            }
                          );
                          const topicsInsertStr = format(
                            `INSERT INTO topics(slug, description, img_url) VALUES %L RETURNING *`,
                            formattedTopicValues
                          );
                          return db
                            .query(topicsInsertStr)
                            .then((topicsResults) => topicsResults.rows);
                        })
                        .then(() => {
                          const formattedUserValues = userData.map(
                            ({ username, name, avatar_url }) => {
                              return [username, name, avatar_url];
                            }
                          );
                          const usersInsertStr = format(
                            `INSERT INTO users(username, name, avatar_url) VALUES %L RETURNING *`,
                            formattedUserValues
                          );
                          return db
                            .query(usersInsertStr)
                            .then((usersResults) => usersResults.rows);
                        })
                        .then(() => {
                          const timestampAdjustedArticleValues =
                            articleData.map((article) =>
                              convertTimestampToDate(article)
                            );
                          const formattedArticleValues =
                            timestampAdjustedArticleValues.map(
                              ({
                                title,
                                topic,
                                author,
                                body,
                                created_at,
                                votes,
                                article_img_url,
                              }) => {
                                return [
                                  title,
                                  topic,
                                  author,
                                  body,
                                  created_at,
                                  votes,
                                  article_img_url,
                                ];
                              }
                            );
                          const articlesInsertStr = format(
                            `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
                            formattedArticleValues
                          );
                          return db
                            .query(articlesInsertStr)
                            .then((articlesResults) => articlesResults.rows);
                        })
                        .then(() => {
                          const timestampAdjustedCommentValues =
                            commentData.map((comment) =>
                              convertTimestampToDate(comment)
                            );

                          return Promise.all(
                            timestampAdjustedCommentValues.map((comment) =>
                              getArticleID(comment)
                            )
                          ).then((correctedComments) => {
                            const formattedCommentValues =
                              correctedComments.map(
                                ({
                                  article_id,
                                  body,
                                  votes,
                                  author,
                                  created_at,
                                }) => {
                                  return [
                                    article_id,
                                    body,
                                    votes,
                                    author,
                                    created_at,
                                  ];
                                }
                              );

                            const commentsInsertStr = format(
                              `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L RETURNING *`,
                              formattedCommentValues
                            );

                            return db
                              .query(commentsInsertStr)
                              .then((commentsResults) => commentsResults.rows);
                          });
                        });
                    });
                });
            });
        });
      });
    });
  });
};
module.exports = seed;
