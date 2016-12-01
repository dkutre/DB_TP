var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
//var threadDetails = require('../thread/details');
//var postDetails = require('../post/details');
var forumDetails = require('../forum/details');

var error = func.errors;

function details(dataObject, responceCallback) {
  if (!dataObject.related) {
    dataObject.related = [];
  }
  if (!func.checkFields(dataObject, ['thread'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  if (!func.possibleValuesForVarieble(dataObject.related, ['user', 'forum'])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  db.query('SELECT * FROM thread WHERE id = ?',
    [dataObject.thread],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        if (res.length === 0) {
          err = error.norecord;
          responceCallback(err.code, err.message);
        }
        else {
          //все ок и thread найден
          //отбрасываем rowdatapacket
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
              }
            },
            function (err, results) {
              if (err) {
                responceCallback(err.code, err.message);
              }
              else {
                responceCallback(0, views.thread(res, results.forum, results.user));
              }
            }
          );
        }
      }
    }
  );
}

module.exports = details;
