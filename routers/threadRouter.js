var express = require('express');
var threadRouter = express.Router();


threadRouter.use(function (req, res, next) {
  console.log("/thread");
});

module.exports = threadRouter;
