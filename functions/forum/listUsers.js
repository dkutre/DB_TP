var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;
var userDetails = require('../user/details')


function getSQLForListUsers(wherefrom) {
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
  if (!func.possibleValues([dataObject.order], [['desc', 'asc']])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!func.checkFields(dataObject, ['forum'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query(getSQLForListUsers(dataObject),
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        if (res.length === 0) {
          responceCallback(0, []);
        } else {
          res = res.map((elem) => {
            return function (callback) {
              var userObject = {user: elem.uEmail};
              userDetails(userObject, function (code, res) {
                callback(null, res);
              });
            }
          });
          async.parallel(res, function (err, results) {
            if (err) {
              responceCallback(err.code, err.message);
            } else {
              responceCallback(0, results);
            }
          });
        }
      }
    }
  );
}

module.exports = listUsers;
