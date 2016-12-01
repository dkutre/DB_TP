var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var postDetails = require('./details');

function update(dataObject, responceCallback) {
  db.query('UPDATE post SET message = ? WHERE id = ?;',
    [dataObject.message, dataObject.post],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        postDetails(dataObject, responceCallback);
      }
    }
  );
}

module.exports = update;
