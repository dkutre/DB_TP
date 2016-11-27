var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;

function details(dataObject, responceCallback) {
  if (!helper.possibleValues([dataObject.related], [['user', '']])) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!helper.checkFields(dataObject, ['forum'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }

  db.query('SELECT * FROM forum WHERE shortname = ?',
    [dataObject.forum], function (err, res) {
      if (err) {
        err = helper.mysqlError(err.errno);
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
            helper.moreDetails(userObject,
              helper.wrapperFunctionForDetails(responceCallback, res));
          } else {
            responceCallback(0, views.forum(res, res.userEmail));
          }
        }
      }
    }
  );
}

module.exports = details;
