var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function create(data, callback) {
 // console.log('post_create', data);

  if (!data.hasOwnProperty('parent')) {
    data.parent = 0;
  }
  else if (data.parent === null) {
    data.parent = 0;
  }
  if (!data.hasOwnProperty('isSpam')) {
    data.isSpam = false;
  }
  if (!data.hasOwnProperty('isApproved')) {
    data.isApproved = false;
  }
  if (!data.hasOwnProperty('isEdited')) {
    data.isEdited = false;
  }
  if (!data.hasOwnProperty('isHighlighted')) {
    data.isHighlighted = false;
  }
  if (!data.hasOwnProperty('isDeleted')) {
    data.isDeleted = false;
  }

  if (data.parent < 0 || !data.date || !data.thread || !data.message || !data.user || !data.forum) {
    errors.sendError(3, callback);
  }

  functions.getMathPath(data, function (err, path) {
    if (err) {
      console.log(err);
      errors.sendSqlError(err, callback);
    } else {
      console.log('math_path = ', path);
      db.query("INSERT INTO posts (date, thread_id, message, userEmail, forumShortName," +
        " parent, isApproved, isHighlighted, isEdited, isSpam, isDeleted, " + " " +
        "path) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [data.date, data.thread, data.message, data.user, data.forum, data.parent, data.isApproved, data.isHighlighted,
          data.isEdited, data.isSpam, data.isDeleted, path],
        function (err, res) {
          if (err) {
            console.log(err);
            errors.sendSqlError(err, callback);
          } else {
            if (data.patent === 0) {
              data.parent = null;
            }
            data.id = res.insertId;
           // console.log(data);
            callback(0, data);
          }
        });
    }
  });


}

module.exports = create;
