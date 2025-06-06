// const db = require("./db/connection");

// exports.checkTopicExists = (topic) => {
//   return db
//     .query(`SELECT * FROM topics WHERE slug = $1;`, [topic])
//     .then(({ rowCount }) => {
//       if (rowCount === 0) {
//         return false;
//       }
//       return true;
//     });
// };
