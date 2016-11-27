var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;
var userDetails = require('./details');

function listFollowing(dataObject, responceCallback) {
  if (!helper.possibleValues([dataObject.order], [['desc', 'asc']])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!helper.checkFields(dataObject, ['user'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query(helper.getSQLForFollowers('followerEmail', 'followeeEmail', dataObject),
    [dataObject.user],
    function (err, res) {
      if (err) {
        err = helper.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      } else {
        if (res.length === 0) {
          responceCallback(0, []);
        } else {
          //создадим функции для запроса userDetails'ов
          res = res.map(elem => {
            return function (callback) {
              var userEmail = {
                user: elem.followerEmail
              };
              userDetails(userEmail, (code, res) => {
                callback(null, res);
              });
            }
          });
          //асинхронный запрос всех юзеров
          async.parallel(res, function (err, results) {
              if (err) {
                responceCallback(err.code, err.message);
              }
              else {
                responceCallback(0, results);
              }
            }
          );
        }
      }
    }
  );
}


module.exports = listFollowing;
