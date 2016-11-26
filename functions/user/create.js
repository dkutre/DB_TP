var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;


function create(dataObject, responceCallback) {
  //TODO можно оптимизировать убрав лищний select
  if (!dataObject.username) dataObject.username = '';
  if (!dataObject.about) dataObject.about = '';
  if (!dataObject.name) dataObject.name = '';
  if (!helper.checkFields(dataObject, ['email'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }

  async.series([
    function (callback) {
      db.query("INSERT INTO user (username, about, name, email, isAnonymous) values (?, ?, ?, ?, ?)",
        [dataObject.username, dataObject.about, dataObject.name, dataObject.email, dataObject.isAnonymous],
        function (err, res) {
          if (err) err = helper.mysqlError(err.errno);
          if (err) callback(err, null);
          else callback(null, res);
        });
    },
    function (callback) {
      db.query("SELECT * FROM user WHERE email = ?",
        [dataObject.email],
        function (err, res) {
          if (err) err = helper.mysqlError(err.errno);
          else {
            if (res.length === 0) err = error.notWrite;
          }
          if (err) callback(err, null);
          else callback(null, res);
        });
    }
  ], function (err, res) {
    if (err) responceCallback(err.code, err.message);
    else {
      res = res[1][0];
      responceCallback(0, views.user(res, [], [], []));
    }
  });
}

module.exports = create;
