getError = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');

function unfollow(data, callback) {
  console.log(data);
  if (!data.follower || !data.follower) {
    errors.sendError(3, callback);
  } else {
    db.query("DELETE FROM followers WHERE follower_email = ? AND followee_email = ?",
      [data.follower, data.followee],
      function (err, res) {
        if (err) {
          //errors
          errors.sendSqlError(err, callback);
        } else {
          functions.getFullUser(data.follower, callback);
        }
      });
  }
}

module.exports = unfollow;
