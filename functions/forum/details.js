var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function details(data, callback) {
//  console.log(data);
  if (!data.forum) {
    errors.sendError(3, callback);
  } else {
    db.query("SELECT * FROM forums WHERE short_name = ?;",
      [data.forum],
      function (err, forum) {
        if (err) {
          errors.sendSqlError(err, callback);
        } else {
          //console.log(forum);
          forum = Object.assign({}, forum[0]);
          //result = JSON.stringify(result);
         // result.id = res.insertId;
          if (data.related === 'user') {
            functions.getFullUser(forum.user, function (code, res) {
              forum.user = res;
              //console.log(forum);
              callback(0, forum);
            });
          } else {
            callback(0, forum);
          }
        }
      });
  }
}

module.exports = details;
