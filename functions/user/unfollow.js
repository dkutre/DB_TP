getError = require('../errors');
var db = require('../connection');
functions = require('../system_fucntions');

function unfollow(data, callback) {
  console.log(data);
  if (!data.follower || !data.follower) {
    callback(getError(3).code, getError(3).response);
  } else {
    db.query("DELETE FROM followers WHERE follower_email = ? AND followee_email = ?",
      [data.follower, data.followee],
      function (err, res) {
        if (err) {
          //errors
        } else {
          functions.getFullUser(data.followee, callback);
        }
      });
  }
}

module.exports = unfollow;
