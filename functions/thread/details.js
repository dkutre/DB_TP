var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');
var forumDetails = require('../forum/details');
var async = require('async');

function details(data, responseCallback) {
  if (!data.thread || data.thread < 0) {
    errors.sendError(3, callback);
  } else {
 //   console.log('data', data);
    db.query('SELECT * FROM threads WHERE id = ?',
      [data.thread],
      function (err, thread) {
        if (err) {
          console.log(err);
          errors.sendSqlError(err, callback);
        }
          thread = Object.assign({}, thread[0]); // извлекаем из rowdatapack
        //thread = JSON.stringify(thread);
        //console.log('result:', result);
        if (data.related) {
          async.parallel({
              user: function (callback) {
                if (data.related.indexOf('user') + 1) {
                  functions.getFullUser(thread.user, function (err, user) {
                    callback(0, user);
                  });
                } else {
                  callback(0, thread.user);
                }
              },
              forum: function (callback) {
                if (data.related.indexOf('forum') + 1) {
                  forumDetails({forum: thread.forumShortName}, function (err, forum) {
                    callback(0, forum);
                  });
                } else {
                  callback(0, thread.forumShortName);
                }
              }
            },
            function (err, results) {
              if (err) {
                console.log('thread_details_async_error', err);
              } else {
                thread.forum = results.forum;
                thread.user = results.user;
             //   console.log('thread_details_result', thread);
                responseCallback(0, thread);
              }
            }
          );
        } else {
          responseCallback(0, thread);
        }
      }
    );
  }
}

module.exports = details;
