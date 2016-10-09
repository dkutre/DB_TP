var express = require('express');
var userRouter = express.Router();


userRouter.use(function (req, res, next) {
  console.log("/user");
  res.send('kek');
});

module.exports = userRouter;
