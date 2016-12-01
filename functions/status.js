var db = require('./connection');
var helper = require('./system_fucntions');
var async = require('async');
var views = require('./views');
var error = helper.errors;


function status(responceCallback) {
  async.parallel([
      function (callback) {
        db.query("SELECT COUNT(*) AS count FROM user",
          function (err, res) {
            if (err) {
              callback(helper.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("SELECT COUNT(*) AS count FROM thread",
          function (err, res) {
            if (err) {
              callback(helper.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("SELECT COUNT(*) AS count FROM forum",
          function (err, res) {
            if (err) {
              callback(helper.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("SELECT COUNT(*) AS count FROM post",
          function (err, res) {
            if (err) {
              callback(helper.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      }
    ],
    function (err, results) {
      if (err) {
        responceCallback(err.code, err.message);
      }
      else {
        responceCallback(0, {
          'user': results[0][0].count,
          'thread': results[1][0].count,
          'forum': results[2][0].count,
          'post': results[3][0].count
        });
      }
    }
  );
}

module.exports = status;
