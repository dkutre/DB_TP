var db = require('../connection');
var errors = require('../errors');



function create(data, callback) {
  /*
   создание юзера
   */
  console.log(data);
  if (data.isAnonymous === undefined) {
    data.isAnonymous = false;
  }

  if (!data.email) {
    console.log('email_undefined');
    errors.sendError(3, callback); // некорректный сапрос
  }

  db.query("INSERT INTO users (username, about, name, email, isAnonymous) VALUES (?, ?, ?, ?, ?);",
    [data.username, data.about, data.name, data.email, data.isAnonymous],
    function (err, res) {
      if (err) {
        console.log(err);
        errors.sendSqlError(err, callback);
      } else {
        data.id = res.insertId;
        callback(0, data);
        console.log(data);
      }
    });
}

module.exports = create;
