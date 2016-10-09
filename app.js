var express = require('express');
var app = express();

//var mysql = require('mysql');


var userRouter   = require('./routers/userRouter');
var threadRouter = require('./routers/threadRouter');
var forumRouter  = require('./routers/forumRouter');
var postRouter   = require('./routers/postRouter');
var router       = require('./routers/router');

API_URL = '/db/api/';

app.use(API_URL, router);
app.use(API_URL + 'user',   userRouter);
app.use(API_URL + 'thread', threadRouter);
app.use(API_URL + 'forum',  forumRouter);
app.use(API_URL + 'post',   postRouter);



app.listen(3000, function () {
  console.log('myApp listening on port 3000!');
});
