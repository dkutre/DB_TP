var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');

function restore(dataObject, responceCallback) {
  db.query('SELECT threadId FROM post WHERE id = ?;',
    [dataObject.post],
    function (err, res) {
      if (err) {
        err = helper.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        if (res.length === 0) {
          err = error.norecord;
          responceCallback(err.code, err.message);
        }
        else {
          async.parallel([
              function (callback) {
                db.query('UPDATE post SET isDeleted = false WHERE id = ?;',
                  [dataObject.post],
                  function (err, res) {
                    if (err) {
                      err = helper.mysqlError(err.errno);
                      callback(err, null);
                    }
                    else {
                      callback(null, res);
                    }
                  });
              },
              function (callback) {
                db.query('UPDATE thread SET posts = posts + 1 WHERE id = ?;',
                  [res[0].threadId],
                  function (err, res) {
                    if (err) {
                      err = helper.mysqlError(err.errno);
                      callback(err, null);
                    }
                    else {
                      callback(null, res);
                    }
                  });
              }
            ],
            function (err, res) {
              if (!err) {
                responceCallback(0, {
                  "post": dataObject.post
                });
              } else {
                responceCallback(err.code, err.message);
              }
            }
          );
        }
      }
    }
  );
}

module.exports = restore;
