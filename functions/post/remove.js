var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function remove(dataObject, responceCallback) {
  db.query('SELECT threadId FROM post WHERE id = ?;',
    [dataObject.post],
    function (err, res) {
      if (err) err = helper.mysqlError(err.errno);
      else {
        if (res.length == 0) err = error.norecord;
      }
      if (err) responceCallback(err.code, err.message)
      else {
        async.parallel([
          function (callback) {
            db.query('UPDATE post SET isDeleted = true WHERE id = ?;',
              [dataObject.post],
              function (err, res) {
                if (err) err = helper.mysqlError(err.errno);
                if (err) callback(err, null)
                else callback(null, res);
              });
          },
          function (callback) {
            db.query('UPDATE thread SET posts = posts - 1 WHERE id = ?;',
              [res[0].threadId],
              function (err, res) {
                if (err) err = helper.mysqlError(err.errno);
                if (err) callback(err, null)
                else callback(null, res);
              });
          }
        ], function (err, res) {
          if (err) responceCallback(err.code, err.message);
          else responceCallback(0, {
            "post": dataObject.post
          });
        });
      }
    });
}

module.exports = remove;
