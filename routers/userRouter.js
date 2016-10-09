var express = require('express');
var userRouter = express.Router();
var functions = require('../functions/functions');
var callback = require('../response');
/*
userRouter.use(function (req, res, next) {
  console.log("/user");
  next();
});*/

userRouter.post('/create', function (req, res) {
  console.log('create');
  functions.userCreate(req.body, callback(res));
});

userRouter.get('/details', function (req, res) {
  console.log('details');
  functions.userDetails(req, callback(res));
});

userRouter.post('/follow', function (req, res) {
  functions.userFollow(callback(res));
});

userRouter.get('/listFollowers', function (req, res) {
  functions.userListFollowers(callback(res));
});

userRouter.get('/listFollowing', function (req, res) {
  functions.userListFollowing(callback(res));
});

userRouter.post('/updateProfile', function (req, res) {
  functions.userupdateProf(callback(res));
});


userRouter.post('/listPosts', function (req, res) {
  functions.userListPosts(callback(res));
});


userRouter.post('/unfollow', function (req, res) {
  functions.userUnfollow(callback(res));
});

module.exports = userRouter;
