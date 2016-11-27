var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
var error = helper.errors;


function close(dataObject, responceCallback) {
  db.query('UPDATE thread SET isClosed = true WHERE id = ?',
    [dataObject.thread],
    function(err, res) {
      if (err) err = helper.mysqlError(err.errno);
      if (err) responceCallback(err.code, err.message);
      responceCallback(0, dataObject);
    });
}

module.exports = close;
