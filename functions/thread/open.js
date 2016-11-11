var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function open(data, callback) {
  if (!data.thread) {
    errors.sendError(3, callback);
  }

  db.query('UPDATE threads SET isClosed = false WHERE id = ?',
  [data.thread], function (err, res) {
      if (err) {
        errors.sendSqlError(err, callback);
      } else {
        callback(0, data);
      }
    });
}

module.exports = open;
