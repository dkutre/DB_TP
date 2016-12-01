var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
var forumDetails = require('../forum/details');
var threadDetails = require('../thread/details');

var error = func.errors;

function details(dataObject, responceCallback) {
  if (!func.checkFields(dataObject, ['post',])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query('SELECT * FROM post WHERE id = ?',
    [dataObject.post],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        if (res.length === 0) {
          responceCallback(error.norecord.code, error.norecord.message);
        } else {
          res = res[0];
          async.parallel({
              user: function (callback) {
                if (func.isEntry('user', dataObject.related)) {
                  var userObject = {
                    user: res.userEmail
                  };
                  func.moreDetails(userObject, function (code, res) {
                    callback(null, res);
                  });
                } else {
                  callback(null, res.userEmail);
                }
              },
              forum: function (callback) {
                if (func.isEntry('forum', dataObject.related)) {
                  var forumObject = {
                    forum: res.forumShortname
                  };
                  forumDetails(forumObject, function (code, res) {
                    callback(null, res);
                  });
                } else {
                  callback(null, res.forumShortname);
                }
              },
              thread: function (callback) {
                if (func.isEntry('thread', dataObject.related)) {
                  var threadObject = {
                    thread: res.threadId
                  };
                  threadDetails(threadObject, function (code, res) {
                    callback(null, res);
                  });
                } else {
                  callback(null, res.threadId);
                }
              }
            },
            function (err, results) {
              if (err) {
                responceCallback(err.code, err.message);
              }
              else {
                responceCallback(0, views.post(res, results.forum, results.thread, results.user));
              }
            });
        }
      }
    }
  );
}

module.exports = details;
