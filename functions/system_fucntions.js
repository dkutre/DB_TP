var db = require('./connection');
var errors = require('./errors');

module.exports.getFullUser = function (email, callback) {
  if (!email) {
    errors.sendError(3, callback);
  }
  console.log('getFullUser');
  db.query(
    "SELECT about, email, users.id, isAnonymous, name, " +
    "GROUP_CONCAT(DISTINCT f1.followee_email SEPARATOR ', ') AS followers, " +
    "GROUP_CONCAT(DISTINCT f2.follower_email SEPARATOR ', ') AS following, " +
    "GROUP_CONCAT(DISTINCT thread_id SEPARATOR ', ') AS subscriptions, username " +
    "FROM users " +
    "LEFT JOIN subscribers ON email = user_email " +
    "LEFT JOIN followers AS f1 ON f1.follower_email = email " +
    "LEFT JOIN followers AS f2 ON f2.followee_email = email " +
    "WHERE email = ? " +
    "GROUP BY email;",
    [email], function (err, res) {
      if (err) {
        console.log(err);
        errors.sendSqlError(err, callback);
      } else {
        if (res) {
          console.log(res);
          callback(0, res);
        } else {
          callback(1, 'error_getFullUser');
        }
      }
    }
  );
};
/*
module.exports.getForum = function (short_name, callback) {
  db.query('SELECT * FROM forums WHEREE short_name = ?',
    [short_name],
    function (err, res) {
      if (err) {
        errors.sendSqlError(err, callback);
      } else {
        callback(0, res);
      }
  });

};*/