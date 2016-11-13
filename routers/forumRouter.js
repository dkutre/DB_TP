var express = require('express');
var forumRouter = express.Router();
var functions = require('../functions/functions');
var callback = require('../response');

forumRouter.use(function (req, res, next) {
  console.log("/forum");
  next();
});

forumRouter.post('/create', function (req, res) {
  console.log("/forum");
  functions.forumCreate(req.body, callback(res));
});

forumRouter.get('/details', function (req, res) {
  console.log('forum_details');
  functions.forumDetails(req.query, callback(res));
});

forumRouter.get('/listPosts', function (req, res) {
  functions.forumListPosts(callback(res));
});


forumRouter.get('/listThreads', function (req, res) {
  functions.forumListThreads(callback(res));
});

forumRouter.get('/listUsers', function (req, res) {
  functions.forumListUsers(callback(res));
});


module.exports = forumRouter;
