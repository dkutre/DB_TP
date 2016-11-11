var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');
var threadDetails = require('./details');


function vote(data, callback) {
  if (!data.thread || (data.vote != -1 || data.vote != 1)) {
    errors.sendError(3, callback);
  }

  if (data.vote === 1) { //like
    db.query('UPDATE threads SET likes = likes + 1 WHERE id = ?',
      [data.thread],
      function (err, res) {
        if (err) {
          errors.sendSqlError(err, callback);
        } else {
          threadDetails(data, callback);
        }
      }
    );
  } else if (data.vote === -1) { //dislike
    db.query('UPDATE threads SET dislikes = dislikes + 1 WHERE id = ?',
      [data.thread],
      function (err, res) {
        if (err) {
          errors.sendSqlError(err, callback);
        } else {
          threadDetails(data, callback);
        }
      }
    );
  }

}

module.exports = vote;
