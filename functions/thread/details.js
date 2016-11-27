var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
//var threadDetails = require('../thread/details');
//var postDetails = require('../post/details');
var forumDetails = require('../forum/details');

var error = helper.errors;

function details(dataObject, responceCallback) {
  if (!dataObject.related) dataObject.related = [];
  if (!helper.checkFields(dataObject, ['thread'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  if (!helper.possibleValuesForVarieble(dataObject.related, ['user', 'forum'])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  db.query('SELECT * FROM thread WHERE id = ?',
    [dataObject.thread],
    function (err, res) {
      if (err) err = helper.mysqlError(err.errno);
      else {
        if (res.length === 0) err = error.norecord;
      }
      if (err) responceCallback(err.code, err.message);
      else {
        //все ок и thread найден
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
          }
        }, function (err, results) {
          if (err) responceCallback(err.code, err.message);
          else {
            responceCallback(0, views.thread(res, results.forum, results.user));
          }
        });
      }
    });
}

module.exports = details;
