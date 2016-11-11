var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function remove(data, callback) {
  if (!data.thread) {
    errors.sendError(3, callback);
  }

  db.query('', [], function (err, res) {

  });
}

module.exports = remove;
