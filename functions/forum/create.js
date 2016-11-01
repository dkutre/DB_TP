errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');



function create(data, responseCallback) {
  if (!data.name || !data.short_name || !data.user) {
    //error
    errors.getError(3, responseCallback);
  } else {
    db.query("INSERT INTO forums (name, short_name, user) VALUES (?, ?, ?);",
      [data.name, data.short_name, data.user],
      function (err, res) {
        if (err) {
          errors.sqlErrors(err, responseCallback);
        } else {
          data.id = res.insertId;
          responseCallback(0, data);
        }
      }
    )
  }
}

module.exports = create;
