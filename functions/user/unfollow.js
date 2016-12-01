var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;

var userDetails = require('./details');

function unfollow(dataObject, responceCallback) {
  if (!func.checkFields(dataObject, ['follower', 'followee'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query("DELETE FROM followers WHERE followerEmail = ? AND followeeEmail = ?",
    [dataObject.follower, dataObject.followee],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      } else {
        userDetails({user: dataObject.follower}, responceCallback);
      }
    }
  );
}


module.exports = unfollow;
