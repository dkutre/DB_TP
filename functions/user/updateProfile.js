var db = require('../connection');
<<<<<<< HEAD
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;
var userDetails = require('./details');

function updateProfile(dataObject, responceCallback) {
  if (!func.checkFields(dataObject, ['about', 'user', 'name'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query("SELECT COUNT(*) AS count FROM user WHERE email = ?",
    [dataObject.user],
    function (err, res) {
      if (err) {
<<<<<<< HEAD
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        if (res.count == 0) {
          err = error.norecord;
          responceCallback(err.code, err.message);
        } else {
          db.query("UPDATE user SET name = ?, about = ? WHERE email = ?",
            [dataObject.name, dataObject.about, dataObject.user],
            function (err, res) {
              if (err) {
                responceCallback(err.code, err.message);
              } else {
                userDetails({user: dataObject.user}, responceCallback);
              }
            }
          );
        }
      }
    }
  );
}

module.exports = updateProfile;
