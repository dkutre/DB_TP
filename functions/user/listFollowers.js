var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;
var userDetails = require('./details');


function listFollowers(dataObject, responceCallback) {
  if (!func.possibleValues([dataObject.order], [['desc', 'asc']])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!func.checkFields(dataObject, ['user'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }

  db.query(func.getSQLForFollowers('followeeEmail', 'followerEmail', dataObject),
    [dataObject.user],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        if (res.length === 0) {
          responceCallback(0, []);
        } else {
          //создадим функции для запроса userDetails'ов
          res = res.map(elem => {
            return function (callback) {
              var userEmail = {
                user: elem.followeeEmail
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
module.exports = listFollowers;
