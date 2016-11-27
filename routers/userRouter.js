var express = require('express');
var userRouter = express.Router();
var functions = require('../functions/functions');
var callback = require('../response');
var logger = require('../functions/logger');
/*
userRouter.use(function (req, res, next) {
  console.log("/user");
  next();
});*/

userRouter.post('/create', function (req, res) {
  console.log('user_create' + req.body);
  functions.userCreate(req.body, callback(res));
});


userRouter.get('/details/', function (req, res) {
  console.log('user_details ' + req.query);
  functions.userDetails(req.query, callback(res));
});

userRouter.post('/follow', function (req, res) {
  console.log('user_follow\n' + req.body);
  functions.userFollow(req.body, callback(res));
});

userRouter.get('/listFollowers', function (req, res) {
  console.log('user_listFollowers');
  functions.userListFollowers(req.query, callback(res));
});

userRouter.get('/listFollowing', function (req, res) {
  console.log('user_listFollowing');
  functions.userListFollowing(req.query, callback(res));
});

userRouter.post('/updateProfile', function (req, res) {
  console.log('user_updateProfile' + req.body);
  functions.userupdateProf(req.body, callback(res));
});


userRouter.get('/listPosts', function (req, res) {
  console.log('user_listPosts');
  functions.userListPosts(req.query, callback(res));
});


userRouter.post('/unfollow', function (req, res) {
  console.log('unfollow\n' + req.body);
  functions.userUnfollow(req.body, callback(res));
});

module.exports = userRouter;
