var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');
var threadDetails = require('./details');

function update(data, callback) {
  if (!data.message || !data.slug || !data.thread) {
    errors.sendError(3, callback);
  }

  db.query('UPDATE threads SET message = ?, slug = ? WHERE id = ?;',
    [data.message, data.slug, data.thread],
    function (err, res) {
      if (err) {
        errors.sendSqlError(err, callback);
      }
      threadDetails(data, function (err, res) {
        callback(0, res);
      });
    }
  );
}

module.exports = update;
