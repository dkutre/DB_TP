var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function remove(dataObject, responceCallback) {
  if (!helper.checkFields(dataObject, ['thread'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query('UPDATE post SET isDeleted = true WHERE threadId = ?',
    [dataObject.thread],
    function (err, res) {
      if (err) {
        err = helper.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
       // console.log(res);
        db.query('UPDATE thread SET isDeleted = true, posts = posts - ? WHERE id = ?',
          [res.changedRows, dataObject.thread],
          function (err, res) {
            if (err) {
              err = helper.mysqlError(err.errno);
              responceCallback(err.code, err.message);
            }
            else {
              responceCallback(0, {
                "thread": dataObject.thread
              });
            }
          }
        );
      }
    }
  );
}

module.exports = remove;
