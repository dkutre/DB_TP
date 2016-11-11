var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function details(data, callback) {
  if (!data.forum) {
    errors.sendError(3, callback);
  } else {
    var result = {};
    db.query("SELECT * FROM forums WHERE short_name = ?;",
      [data.forum],
      function (err, res) {
        if (err) {
          errors.sendSqlError(err, callback);
        } else {
          console.log(res);
          result = res[0];
         // result.id = res.insertId;
          if (data.related === 'user') {
            functions.getFullUser(res[0].user, function (code, res) {
              result.user = res[0];
              console.log(result);
              callback(0, result);
            });
          } else {
            callback(0, data);
          }
        }
      });
  }
}

module.exports = details;
