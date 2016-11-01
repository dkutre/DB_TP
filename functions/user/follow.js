var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function follow(data, callback) {
  console.log(data);
  if (!data.follower || !data.followee) {
    errors.sendError(3, callback);
  } else {
    console.log('follow_func');
    db.query('SELECT COUNT(*) AS count FROM followers WHERE follower_email = ? AND followee_email = ?;',
      [data.follower, data.folowee],
      function (err, res) {
        if (err) {
          console.log(err);
          errors.sendSqlError(err, callback);
        }
        if (res > 0) {
          error.sendError(4, callback);
        } else {
          db.query('INSERT INTO followers (follower_email, followee_email) values (?, ?);',
            [data.follower, data.followee],
            function (err, res) {
              if (err) {
                console.log(err);
                errors.sendSqlError(err, callback);
                //error;
              } else {
                functions.getFullUser(data.follower, callback);
              }
            });
        }
      }
    );
  }
}

module.exports = follow;
