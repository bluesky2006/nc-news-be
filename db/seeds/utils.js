const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

// exports.fetchArticleIdByTitle = ({ article_title, ...otherProperties }) => {
//   if (!article_title) return { ...otherProperties };
//   return db
//     .query("SELECT article_id FROM articles WHERE title = $1;", [article_title])
//     .then((result) => {
//       const { article_id } = result.rows[0];
//       return { article_id, ...otherProperties };
//     });
// };

exports.createLookupMap = (array, key, value) => {
  if (array.length === 0) return {};

  return array.reduce((result, currentObject) => {
    result[currentObject[key]] = currentObject[value];
    return result;
  }, {});
};
