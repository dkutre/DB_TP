var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');
var forumDetails = require('../forum/details');


function details(data, callback) {
  if (!data.thread) {
    errors.sendError(3, callback);
  }
  console.log('data', data);
  db.query('SELECT * FROM threads WHERE id = ?',
    [data.thread],
    function (err, result) {
      if (err) {
        console.log(err);
        errors.sendSqlError(err, callback);
      }

      result = result[0]; // извлекаем из rowdatapack
      console.log('result:', result);
      if (data.related && data.related[0] != data.related[1]) {
        if (data.related[0] === 'user' || data.related[1] === 'user') {
          functions.getFullUser(result.user, function (err, res) {
            if (err) {
              errors.sendSqlError(err, callback);
            } else {
              result.user = res;
              if (data.related[0] === 'forum' || data.related[1] === 'forum') {
                forumDetails({forum: result.forumShortName}, function (err, res) {
                  if (err) {
                    console.log('forum_details неизвестная ошибка', err);
                  }
                  result.forum = res;
                  console.log('thread_details_result', result);
                  callback(0, result);
                });
              }
            }
          });
        } else if (data.related[0] === 'forum' || data.related[1] === 'forum') {
          forumDetails({forum: result.shortName}, function (err, res) {
            if (err) {
              console.log('неизвестная ошибка');
            } else {
              result.forum = res;
              if (data.related[0] === 'user' || data.related[1] === 'user') {
                functions.getFullUser(result.user, function (err, res) {
                  if (err) {
                    errors.sendSqlError(err, callback);
                  }
                  result.user = res;
                  callback(0, result);
                });
              }
            }
          });
        }
      } else {
        callback(0, result);
      }
    });
}

module.exports = details;
