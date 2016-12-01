var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;


function create(dataObject, responceCallback) {
  if (!func.checkFields(dataObject, ['name', 'short_name', 'user'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
  } else {
    async.series([
        function (callback) {
          db.query("INSERT INTO forum (name, shortname, userEmail) values (?, ?, ?)",
            [dataObject.name, dataObject.short_name, dataObject.user],
            function (err, res) {
              if (err) {
                callback(func.mysqlError(err.errno), null);
              }
              else {
                callback(null, res.insertId);
              }
            }
          );
        }
      ],
      function (err, results) {
        if (err) {
          responceCallback(err.code, err.message);
        } else {
          dataObject.id = results[0];
          responceCallback(0, dataObject);
        }
      }
    );
  }
}

module.exports = create;
