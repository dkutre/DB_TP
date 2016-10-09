var express = require('express');
var postRouter = express.Router();


postRouter.use(function (req, res, next) {
  console.log("/post");
});

module.exports = postRouter;
