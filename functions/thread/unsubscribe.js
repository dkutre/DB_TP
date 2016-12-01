var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function unsubscribe(dataObject, responceCallback) {
  db.query(' DELETE FROM subscribes WHERE (userEmail = ?) AND (threadID = ?);',
    [dataObject.user, dataObject.thread],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        responceCallback(0, dataObject);
      }
    }
  );
}

module.exports = unsubscribe;
