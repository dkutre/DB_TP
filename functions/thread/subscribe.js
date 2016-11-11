var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function subscribe(data, callback) {
  if (!data.thread || !data.user) {
    errors.sendError(3, callback);
  }

  db.query('INSERT INTO subscribes (user_email, thread_id) values (?, ?);',
    [data.user, data.thread],
    function (err, res) {
      if (err) {
        errors.sendSqlError(err, callback);
      } else {
        callback(0, data);
      }
    });
}

module.exports = subscribe;
