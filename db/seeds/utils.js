const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupMap = (array, key, value) => {
  if (array.length === 0) return {};
  return array.reduce((result, currentObject) => {
    result[currentObject[key]] = currentObject[value];
    return result;
  }, {});
};
