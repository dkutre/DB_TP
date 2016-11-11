var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');



function create(data, callback) {
  if (!data.name || !data.short_name || !data.user) {
    errors.sendError(3, callback);
  } else {
    db.query("INSERT INTO forums (name, short_name, user) VALUES (?, ?, ?);",
      [data.name, data.short_name, data.user],
      function (err, res) {
        if (err) {
          errors.sendSqlError(err, callback);
        } else {
          data.id = res.insertId;
          callback(0, data);
        }
      }
    )
  }
}

module.exports = create;
