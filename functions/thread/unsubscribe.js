var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function unsubscribe(data, callback) {
  if (!data.user || !data.thread) {
    errors.sendError(3, callback);
  }
  db.query('DELETE FROM subscribes WHERE (user_email = ?) AND (thread_id = ?);',
    [data.user, data.thread],
    function (err, res) {
      if (err) {
        errors.sendSqlError(err, callback);
      } else {
        callback(0, data);
      }
    });
}

module.exports = unsubscribe;
