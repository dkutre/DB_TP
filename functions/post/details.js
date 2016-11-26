var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');
var forumDetails = require('../forum/details');
var threadDetails = require('../thread/details');
var async = require('async');

function details(data, responseCallback) {
//  console.log('post_details', data);
  if (!data.post) {
    errors.sendError(3, responseCallback);
  }

  db.query('SELECT * FROM posts WHERE id = ?',
    [data.post], function (err, post) {
      if (err) {
        console.log(err);
        errors.sendSqlError(err, responseCallback);
      } else {
        post = Object.assign({}, post[0]);
        //post = JSON.stringify(post);
        //console.log('post =', post);
        if (post.parent === 0) {
          delete post.parent;
        }
        if (post.isHighlighted) {
          post.isHighlighted = true;
        } else {
          post.isHighlighted = false;
        }

        post.forum = 'azazaza';
        post.thread = 'thread';
        post.user = 'user';
        //responseCallback(0, post);

        if (data.related) {
          async.parallel({
              // везде прибавлено +1 т.к индекс может быть 0, но строка в массивке есть
              // если индекса нет, то вернется -1 и будет if(0) т.е как раз не пройдет
              user: function (callback) {
                if (data.related.indexOf('user') + 1) {
                  functions.getFullUser(post.userEmail, function (err, user) {
                    post.user = user;
                    callback(0, true);
                    //console.log('user_ok');
                  });
                } else {
                  post.user = post.userEmail;
                  callback(0, post.userEmail);
                }
              },
              forum: function (callback) {
                if (data.related.indexOf('forum') + 1) {
                  forumDetails({forum: post.forumShortName}, function (err, forum) {
                    post.forum = forum;
                    callback(0, true);
                    //console.log('forum_ok');
                  });
                } else {
                  post.forum = post.forumShortName;
                  callback(0, post.forum);
                }
              },
              thr: function (callback) {
                if (data.related.indexOf("thread") + 1) {
                  console.log('lel');
                  threadDetails({thread: post.thread_id}, function (err, res) {
                    post.thread = '';
                    callback(0, true);
                  });
                } else {
                  post.thread = post.thread_id;
                  callback(0, post.thread_id);
                }
              }
            },
            function (err, results) {
              if (err) {
                console.log('post_details_async_error', err);
              } else {
                delete post.forumShortName;
                delete post.thread_id;
                delete post.userEmail;
                responseCallback(0, post);
                console.log('print1', post);
              }
            });
        }
        else {
          // console.log('post_details_result2 = ', post);
          post.forum = post.forumShortName;
          post.thread = post.thread_id;
          post.user = post.userEmail;
          delete post.forumShortName;
          delete post.thread_id;
          delete post.userEmail;
          console.log('print2', post);
          responseCallback(0, post);
        }

      }
    });
}

module.exports = details;
