var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;

function details(dataObject, responceCallback) {
  if (!func.possibleValues([dataObject.related], [['user', '']])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!func.checkFields(dataObject, ['forum'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }

  db.query('SELECT * FROM forum WHERE shortname = ?',
    [dataObject.forum], function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      } else {
        if (res.length === 0) {
          err = error.norecord;
          responceCallback(err.code, err.message);
        }
        else {
          res = res[0];
          if (dataObject.related === 'user') {
            var userObject = {
              user: res.userEmail
            };
            func.moreDetails(userObject,
              func.wrapperFunctionForDetails(responceCallback, res));
          } else {
            responceCallback(0, views.forum(res, res.userEmail));
          }
        }
      }
    }
  );
}

module.exports = details;
