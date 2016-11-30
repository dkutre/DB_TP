var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function subscribe(dataObject, responceCallback) {
  if (!helper.checkFields(dataObject, ['user', 'thread'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }

  db.query('INSERT INTO subscribes (userEmail, threadID) values (?, ?);',
    [dataObject.user, dataObject.thread],
    function (err, res) {
      if (err) {
        err = helper.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      } else {
        responceCallback(0, dataObject);
      }
    }
  );
}


module.exports = subscribe;
