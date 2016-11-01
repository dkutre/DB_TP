var db = require('../connection');
var errors = require('../errors');
var functions = require('../system_fucntions');


function updateProfile(data, callback) {
  console.log('updateProfile', data);
  if (!data.name) {
    data.user = '';
  }
  if (!data.about) {
    data.about = '';
  }
  if (!data.user) {
    errors.sendError(3, callback);
  }
  //console.log('no_error');

  db.query("SELECT COUNT(*) AS count FROM users WHERE email = ?",
    [data.user], function (err, res) {
      if (err) {
        errors.sendSqlError(err, callback);
      } else {
        if (res > 0) {
          errors.sendError(5, callback);
        } else {
          db.query("UPDATE users SET name = ?, about = ? WHERE email = ?",
            [data.name, data.about, data.user], function (err, res) {
              if (err) {
                errors.sendSqlError(err, callback);
              } else {
                functions.getFullUser(data.user, callback);
              }
            })
        }
      }
    })
}

module.exports = updateProfile;
