var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
var forumDetails = require('../forum/details');
var threadDetails = require('../thread/details');

var error = helper.errors;

function details(dataObject, responceCallback) {
  if (!helper.checkFields(dataObject, ['post',])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query('SELECT * FROM post WHERE id = ?',
    [dataObject.post],
    function (err, res) {
      if (err) err = helper.mysqlError(err.errno);
      if (err) responceCallback(err.code, err.message);
      else {
        if (res.length === 0) {
          responceCallback(error.norecord.code, error.norecord.message);
          return;
        } else {
          //все ок и post найден
          //отбрасываем лишнее
          res = res[0];
          async.parallel({
              user: function (callback) {
                if (helper.isEntry('user', dataObject.related)) {
                  //нужно дальше искать информацию по юзеру
                  var userObject = {
                    user: res.userEmail
                  }
                  helper.moreDetails(userObject, function (code, res) {
                    callback(null, res);
                  });
                } else {
                  //не нужно дальше искать информацию по юзеру
                  callback(null, res.userEmail);
                }
              },
              forum: function (callback) {
                if (helper.isEntry('forum', dataObject.related)) {
                  //нужно дальше искать информацию по форуму
                  var forumObject = {
                    forum: res.forumShortname
                  }
                  forumDetails(forumObject, function (code, res) {
                    callback(null, res);
                  });
                } else {
                  //не нужно дальше искать информацию по форуму
                  callback(null, res.forumShortname);
                }
              },
              thread: function (callback) {
                if (helper.isEntry('thread', dataObject.related)) {
                  //нужно дальше искать информацию по треду
                  var threadObject = {
                    thread: res.threadId
                  }
                  threadDetails(threadObject, function (code, res) {
                    callback(null, res);
                  });
                } else {
                  //не нужно дальше искать информацию по треду
                  callback(null, res.threadId);
                }
              }
            },
            function (err, results) {
              if (err) responceCallback(err.code, err.message);
              else responceCallback(0, views.post(res, results.forum, results.thread, results.user));
            });
        }
      }
    });
}

module.exports = details;
