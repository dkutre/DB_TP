var express = require('express');
var threadRouter = express.Router();
var functions = require('../functions/functions');
var callback = require('../response');


threadRouter.use(function (req, res, next) {
  console.log("/thread");
  next();
});

threadRouter.post('/close', function (req, res) {
  functions.threadClose(req.body, callback(res));
});

threadRouter.post('/create', function (req, res) {
  console.log('thread_create');
  functions.threadCreate(req.body, callback(res));
});

threadRouter.get('/details', function (req, res) {
  functions.threadDetails(req.query, callback(res));
});

threadRouter.get('/list', function (req, res) {
  functions.threadList(callback(res));
});

threadRouter.get('/listPosts', function (req, res) {
  functions.threadListPost(callback(res));
});

threadRouter.post('/open', function (req, res) {
  functions.threadOpen(req.body, callback(res));
});

threadRouter.post('/remove', function (req, res) {
  functions.threadRemove(callback(res));
});


threadRouter.post('/restore', function (req, res) {
  functions.threadRestore(callback(res));
});

threadRouter.post('/subscribe', function (req, res) {
  functions.threadSubscribe(callback(res));
});

threadRouter.post('/unsubscribe', function (req, res) {
  functions.threadUnsubscribe(callback(res));
});


threadRouter.post('/update', function (req, res) {
  functions.threadUpdate(callback(res));
});


threadRouter.post('/vote', function (req, res) {
  functions.threadVote(callback(res));
});


module.exports = threadRouter;
