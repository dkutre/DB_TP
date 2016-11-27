var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;
var userDetails = require('../user/details')


function getSQLForListUsers(wherefrom) {
  /*
   SELECT DISTINCT userEmail AS uEmail FROM post LEFT JOIN user
   ON user.email = post.userEmail WHERE post.forumShortname = "kx16gpbia"
   AND post.isDeleted = false ORDER BY user.name asc LIMIT 72;

   explain SELECT * FROM user WHERE email IN (
   SELECT DISTINCT userEmail FROM post WHERE forumShortname = 's8dge'
   ) and id > 0 ORDER BY name ASC LIMIT 29;
   */
  var sql = 'SELECT email AS uEmail FROM user WHERE email IN ( ';

  sql += ' SELECT DISTINCT userEmail FROM post ';

  sql += ' WHERE forumShortname = "' + wherefrom.forum + '" )';
  if (wherefrom.since_id) {
    sql += ' AND id >= ' + wherefrom.since_id;
  }
  if (wherefrom.order !== 'asc') {
    wherefrom.order = 'desc';
  }
  sql += ' ORDER BY name ' + wherefrom.order;
  if (wherefrom.limit) {
    sql += ' LIMIT ' + wherefrom.limit;
  }
  return sql;
}

function listUsers(dataObject, responceCallback) {
  if (!helper.possibleValues([dataObject.order], [['desc', 'asc']])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!helper.checkFields(dataObject, ['forum'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
//TODO оптимизировать
  db.query(getSQLForListUsers(dataObject), function (err, res) {
    if (err)
      err = helper.mysqlError(err.errno);
    if (err) responceCallback(err.code, err.message); else {
      if (res.length === 0) {
        responceCallback(0, []);
        return;
      }
      //преобразуем обекты содержащие emailы в функции для асинхронного вызова
      res = res.map(function (elem) {
        return function (callback) {
          var userObject = {
            user: elem.uEmail
          }
          userDetails(userObject, function (code, res) {
            callback(null, res);
          });
        }
      });
      //асинхронный запрос всех юзеров
      async.parallel(res, function (err, results) {
        if (err) responceCallback(err.code, err.message); else {
          responceCallback(0, results);
        }
      });
    }
  });
}

module.exports = listUsers;
