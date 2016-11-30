var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;


function create(dataObject, responceCallback) {
  if (!helper.checkFields(dataObject, ['name', 'short_name', 'user'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
  } else {
    async.series([
        /*function (callback) {
          db.query("SELECT COUNT(*) AS count FROM user WHERE email = ?",
            [dataObject.user], function (err, res) {
              if (err) {
                err = helper.mysqlError(err.errno);
                callback(err, null);
              } else {
                if (res[0].count == 0) {
                  err = error.norecord;
                  callback(err, null);
                }
                else {
                  callback(null, res);
                }
              }
            }
          );
        },*/
        function (callback) {
          db.query("INSERT INTO forum (name, shortname, userEmail) values (?, ?, ?)",
            [dataObject.name, dataObject.short_name, dataObject.user],
            function (err, res) {
              if (err) {
                callback(helper.mysqlError(err.errno), null);
              }
              else {
                callback(null, res.insertId);
              }
            }
          );
        }/*,
        function (callback) {
          db.query('SELECT * FROM forum WHERE shortname = ?',
            [dataObject.short_name], function (err, res) {
              if (err) {
                err = helper.mysqlError(err.errno);
                callback(err, null);
              } else {
                if (res.length === 0) {
                  err = error.notWrite;

                  callback(err, null);
                }
                else {
                  callback(null, res);
                }
              }
            }
          );
        }*/
      ],
      function (err, results) {
        if (err) {
          responceCallback(err.code, err.message);
        } else {
          dataObject.id = results[0];
          responceCallback(0, views.forum(dataObject, results.userEmail));
        }
      }
    );
  }
}

module.exports = create;
