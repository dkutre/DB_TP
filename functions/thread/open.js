var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function open(dataObject, responceCallback) {
  db.query('UPDATE thread SET isClosed = false WHERE id = ?',
    [dataObject.thread],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      responceCallback(0, dataObject);
    });
}

module.exports = open;
