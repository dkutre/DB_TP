var express = require('express');
var threadRouter = express.Router();
var functions = require('../functions/functions');
var callback = require('../response');


threadRouter.use(function (req, res, next) {
  //console.log("/thread");
  next();
});

threadRouter.post('/close', function (req, res) {
  functions.threadClose(req.body, callback(res));
});

threadRouter.post('/create', function (req, res) {
  functions.threadCreate(req.body, callback(res));
});

threadRouter.get('/details', function (req, res) {
  //console.log('thread_details');
  functions.threadDetails(req.query, callback(res));
});

threadRouter.get('/list', function (req, res) {
  //console.log('thread_list');
  functions.threadList(req.query, callback(res));
});

threadRouter.get('/listPosts', function (req, res) {
  //console.log('thread_listPosts');
  functions.threadListPost(req.query, callback(res));
});

threadRouter.post('/open', function (req, res) {
  //console.log('thread_open');
  functions.threadOpen(req.body, callback(res));
});

threadRouter.post('/remove', function (req, res) {
  //console.log('thread_remove');
  functions.threadRemove(req.body, callback(res));
});


threadRouter.post('/restore', function (req, res) {
  //console.log('thread_restore');
  functions.threadRestore(req.body, callback(res));
});

threadRouter.post('/subscribe', function (req, res) {
  //console.log('thread_subcribe');
  functions.threadSubscribe(req.body, callback(res));
});

threadRouter.post('/unsubscribe', function (req, res) {
  //console.log('thread_unsubcribe');
  functions.threadUnsubscribe(req.body, callback(res));
});


threadRouter.post('/update', function (req, res) {
  //console.log('thread_update');
  functions.threadUpdate(req.body, callback(res));
});


threadRouter.post('/vote', function (req, res) {
  //console.log('thread_vote');
  functions.threadVote(req.body, callback(res));
});


module.exports = threadRouter;
