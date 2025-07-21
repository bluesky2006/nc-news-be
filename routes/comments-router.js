const express = require("express");
const commentsRouter = express.Router();

const {
  deleteCommentByCommentId,
} = require("../controllers/comments.controllers");

commentsRouter.delete("/:comment_id", deleteCommentByCommentId);

module.exports = commentsRouter;
