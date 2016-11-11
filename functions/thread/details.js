var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');

var forumDetails = require('../forum/details');


function details(data, callback) {
  if (!data.thread) {
    errors.sendError(3, callback);
  }

  db.query('SELECT * FROM thread WHERE id = ?',
    [data.thread],
    function (err, result) {
      if (err) {
        errors.sendSqlError(err, callback);
      }
      result = result[0]; // извлекаем из rowdatapack
      if (data.related[0] === 'user' || data.related[1] === 'user') {
        functions.getFullUser(result.user, function (err, res) {
          if (err) {
            errors.sendSqlError(err, callback);
          }
          result.user = res;
        });
      }
      if (data.related[0] === 'forum' || data.related[1] === 'forum') {
        forumDetails({forum: result.shortName}, function (err, res) {
          if (err) {
            console.log('неизвестная ошибка');
          }
          result.forum = res;
        });
      }
      callback(0, res);
    }
  );
}

module.exports = details;
