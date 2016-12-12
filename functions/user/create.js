var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;


function create(dataObject, responceCallback) {
  if (!dataObject.username) {
    dataObject.username = '';
  }
  if (!dataObject.about) {
    dataObject.about = '';
  }
  if (!dataObject.name) {
    dataObject.name = '';
  }
  if (!func.checkFields(dataObject, ['email'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }

  async.series([
      function (callback) {
        db.query("INSERT INTO user (username, about, name, email, isAnonymous) values (?, ?, ?, ?, ?)",
          [dataObject.username, dataObject.about, dataObject.name, dataObject.email, dataObject.isAnonymous],
          function (err, res) {
            if (err) {
              err = func.mysqlError(err.errno);
              callback(err, null);
            }
            // if (err) callback(err, null);
            else {
              console.log('insert');
              dataObject.id = res.insertId;
              callback(null, res);
            }
          });
      }/*,
      function (callback) {
        db.query("SELECT * FROM user WHERE email = ?",
          [dataObject.email],
          function (err, res) {
            if (err) {
              err = func.mysqlError(err.errno);
              callback(err, null)
            }
            else {
              if (res.length === 0) {
                err = error.notWrite;
                callback(err, null)
              } else {
                res = res[0];//rowdatapacket
                callback(null, res);
              }
            }
          }
        );
      }*/],
    function (err, res) {
      if (err) {
        responceCallback(err.code, err.message);
      }
      else {
        res = res[1];
        responceCallback(0, dataObject);//views.user(res, [], [], []));
      }
    }
  );
}

module.exports = create;
