var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function create(data, callback) {
  console.log('thread_create', data);
  if (!data.forum || !data.title || !data.isClosed || !data.user || !data.date || !data.message || !data.slug) {
    errors.sendError(3, callback);
  }
  if (!data.isDeleted) {
    data.isDeleted = false;
  }
  db.query('INSERT INTO threads (forumShortname, title, isClosed, user, date, message, slug, isDeleted) ' +
    'values (?, ?, ?, ?, ?, ?, ?, ?);',
    [data.forum, data.title, data.isClosed, data.user, data.date, data.message, data.slug, data.isDeleted],
    function (err, res) {
      if (err) {
        console.log(err);
        errors.sendSqlError(err, callback);
      } else {
        data.id = res.insertId;
        callback(0, data);
      }
    }
  );
}

module.exports = create;
