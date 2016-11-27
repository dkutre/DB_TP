var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function restore(dataObject, responceCallback) {
  db.query('UPDATE post SET isDeleted = false WHERE threadId = ?',
    [dataObject.thread],
    function (err, res) {
      if (err) err = helper.mysqlError(err.errno);
      if (err) responceCallback(err.code, err.message);
      else {
        db.query('UPDATE thread SET isDeleted = false, posts = posts + ? WHERE id = ?',
          [res.changedRows, dataObject.thread],
          function (err, res) {
            if (err) err = helper.mysqlError(err.errno);
            if (err) responceCallback(err.code, err.message);
            else responceCallback(0, {
              "thread": dataObject.thread
            });
          });
      }
    });
}

module.exports = restore;
