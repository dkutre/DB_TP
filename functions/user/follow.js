getError = require('../errors');
var db = require('../connection');
functions = require('../system_fucntions');

function follow(data, callback) {
  console.log(data);
  if (!data.follower || !data.followee) {
    callback(getError(3).code, getError(3).response); // некорректный запрос
  } else {
    console.log('follow_func');
    db.query('SELECT COUNT(*) AS count FROM followers WHERE follower_email = ? AND followee_email = ?',
      [data.follower, data.folowee],
      function (err, res) {
        if (err) {
          console.log(err);
        }
        if (res > 0) {
          callback(getError(4).code, getError(4).responce);
        } else {
          db.query('INSERT INTO followers (followee_email, follower_email) values (?, ?)',
            [data.followee, data.follower],
            function (err, res) {
              if (err) {
                console.log(err);
                //error;
              } else {
                functions.getFullUser(data.followee, callback);
              }
            });
        }
      }
    );
  }
}

module.exports = follow;
