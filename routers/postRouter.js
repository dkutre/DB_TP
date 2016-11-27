var express = require('express');
var postRouter = express.Router();
var functions = require('../functions/functions');
var callback = require('../response');


postRouter.use(function (req, res, next) {
  console.log("/post");
  next();
});

postRouter.post('/create', function (req, res) {
  console.log('post_create');
  functions.postCreate(req.body, callback(res));
});


postRouter.get('/details', function (req, res) {
  console.log('post_details');
  functions.postDetails(req.query, callback(res));
});

postRouter.get('/list', function (req, res) {
  console.log('post_list');
  functions.postList(req.query, callback(res));
});


postRouter.post('/remove', function (req, res) {
  console.log('post_remove');
  functions.postRemove(req.body, callback(res));
});

postRouter.post('/restore', function (req, res) {
  console.log('post_restore');
  functions.postRestore(req.body, callback(res));
});

postRouter.post('/update', function (req, res) {
  console.log('post_update');
  functions.postUpdate(req.body, callback(res));
});

postRouter.post('/vote', function (req, res) {
  console.log('post_vote');
  functions.postVote(req.body, callback(res));
});


module.exports = postRouter;
