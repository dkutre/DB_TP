var db = require('./connection');
var func = require('./system_fucntions');
var async = require('async');
var views = require('./views');
var error = func.errors;


function clear(responceCallback) {
  async.parallel([
      function (callback) {
        db.query("TRUNCATE TABLE user",
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("TRUNCATE TABLE forum",
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("TRUNCATE TABLE thread",
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("TRUNCATE TABLE subscribes",
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("TRUNCATE TABLE followers",
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query("TRUNCATE TABLE post",
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
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
        responceCallback(0, "OK");
      }
    }
  );
}

module.exports = clear;