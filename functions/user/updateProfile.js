var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;
var userDetails = require('./details');

function updateProfile(dataObject, responceCallback) {
  if (!helper.checkFields(dataObject, ['about', 'user', 'name'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query("SELECT COUNT(*) AS count FROM user WHERE email = ?",
    [dataObject.user],
    function (err, res) {
      if (err) err = helper.mysqlError(err.errno)
      else {
        if (res.count == 0) err = error.norecord;
      }
      if (err) responceCallback(err.code, err.message);
      else {
        db.query("UPDATE user SET name = ?, about = ? WHERE email = ?",
          [dataObject.name, dataObject.about, dataObject.user],
          function (err, res) {
            if (err) responceCallback(err.code, err.message);
            else userDetails({user: dataObject.user}, responceCallback);
          });
      }
    });
}

module.exports = updateProfile;
