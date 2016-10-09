var express = require('express');
var forumRouter = express.Router();


forumRouter.use(function (req, res, next) {
  console.log("/forum");
});

module.exports = forumRouter;
