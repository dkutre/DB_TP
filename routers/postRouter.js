var express = require('express');
var postRouter = express.Router();
var functions = require('../functions/functions');
var callback = require('../response');


postRouter.use(function (req, res, next) {
  console.log("/post");
  next();
});

postRouter.post('/create', function (req, res) {
  functions.postCreate(req.body, callback(res));
});


postRouter.get('/details', function (req, res) {
  functions.postDetails(req.query, callback(res));
});

postRouter.get('/list', function (req, res) {
  functions.postList(callback(res));
});


postRouter.post('/remove', function (req, res) {
  functions.postRemove(callback(res));
});

postRouter.post('/restore', function (req, res) {
  functions.postRestore(callback(res));
});

postRouter.post('/update', function (req, res) {
  functions.postUpdate(callback(res));
});

postRouter.post('/vote', function (req, res) {
  functions.postVote(callback(res));
});


module.exports = postRouter;
