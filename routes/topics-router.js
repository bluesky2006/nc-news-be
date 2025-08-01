const express = require("express");
const topicsRouter = express.Router();

const { getAllTopics } = require("../controllers/topics.controllers");

topicsRouter.get("/", getAllTopics);

module.exports = topicsRouter;
