var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var userRouter   = require('./routers/userRouter');
var threadRouter = require('./routers/threadRouter');
var forumRouter  = require('./routers/forumRouter');
var postRouter   = require('./routers/postRouter');
var router       = require('./routers/router');

API_URL = '/db/api/';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(API_URL + 'user',   userRouter);
app.use(API_URL + 'thread', threadRouter);
app.use(API_URL + 'forum',  forumRouter);
app.use(API_URL + 'post',   postRouter);
app.use(API_URL, router);


app.listen(3000, function () {
  console.log('myApp listening on port 3000!');
});
