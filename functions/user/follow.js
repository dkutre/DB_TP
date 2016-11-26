var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;
var userDetails = require('./details');


function follow(dataObject, responceCallback) {
  if (!helper.checkFields(dataObject, ['follower', 'followee'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query("SELECT COUNT(*) AS count FROM followers WHERE followerEmail = ? AND followeeEmail = ?",
    [dataObject.follower, dataObject.followee],
    function (err, res) {
      if (err) err = helper.mysqlError(err.errno);
      else {
        if (res.count > 0) err = error.duplicateRecord;
      }
      if (err) responceCallback(err.code, err.message);
      else {
        //запрос проверен
        db.query("INSERT INTO followers (followerEmail, followeeEmail) values (?, ?)",
          [dataObject.follower, dataObject.followee],
          function (err, res) {
            if (err) err = helper.mysqlError(err.errno);
            if (err) responceCallback(err.code, err.message);
            else userDetails({user: dataObject.follower}, responceCallback);
          });
      }
    });
}

module.exports = follow;
