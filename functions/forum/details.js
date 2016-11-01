errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');

function callback(json, responseCallBack) {

}

function details(data, callback) {
  if (!data.forum) {
    errors.getError(3, callback);
  } else {
    var result = {};
    db.query("SELECT * FROM forums WHERE short_name = ?;",
      [data.forum],
      function (err, res) {
        if (err) {
          errors.sqlErrors(err, callback);
        } else {
          if (data.related === 'user') {
            result = res;
            functions.getFullUser(res.user, function (code, response) {
              callback(0, result);
              //todo
            })
          } else {
            data.id = res.insertId;
            callback(0, data);
          }
        }
      });
  }
}

module.exports = details;
