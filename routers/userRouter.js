var express = require('express');
var userRouter = express.Router();


userRouter.use(function (req, res, next) {
  console.log("/user");
  res.send('kek');
});

forumRouter.post('/create', function (req, res) {
  functions.userCreate(callback(res));
});

forumRouter.get('/details', function (req, res) {
  functions.userDetails(callback(res));
});

forumRouter.post('/follow', function (req, res) {
  functions.userFollow(callback(res));
});

forumRouter.get('/listFollowers', function (req, res) {
  functions.userListFollowers(callback(res));
});

forumRouter.get('/listFollowing', function (req, res) {
  functions.userListFollowing(callback(res));
});

forumRouter.post('/updateProfile', function (req, res) {
  functions.userupdateProf(callback(res));
});


forumRouter.post('/listPosts', function (req, res) {
  functions.userListPosts(callback(res));
});


forumRouter.post('/unfollow', function (req, res) {
  functions.userUnfollow(callback(res));
});

module.exports = userRouter;
