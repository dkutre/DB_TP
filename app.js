var express = require('express');
var app = express();

var userRouter   = require('./routers/userRouter');
var threadRouter = require('./routers/threadRouter');
var forumRouter  = require('./routers/forumRouter');
var postRouter   = require('./routers/postRouter');

DATA_BASE_URL = '/db/api/';


app.use('/user'   + DATA_BASE_URL, userRouter);
app.use('/thread' + DATA_BASE_URL, threadRouter);
app.use('/forum'  + DATA_BASE_URL, forumRouter);
app.use('/post'   + DATA_BASE_URL, postRouter);


app.listen(3000, function () {
  console.log('myApp listening on port 3000!');
});
