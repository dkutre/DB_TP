var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function create(data, callback) {
 // console.log('thread_create', data);
  if (!data.isDeleted) {
    data.isDeleted = false;
  }
  if (!data.hasOwnProperty('forum') || !data.hasOwnProperty('title')
    || !data.hasOwnProperty('isClosed') || !data.hasOwnProperty('user')
    || !data.hasOwnProperty('date') || !data.hasOwnProperty('message') || !data.hasOwnProperty('slug')) {
    console.log('thread_create_error bad request');
    errors.sendError(3, callback);
  } else {
    db.query('INSERT INTO threads (forumShortname, title, isClosed, user, date, message, slug, isDeleted) ' +
      'values (?, ?, ?, ?, ?, ?, ?, ?);',
      [data.forum, data.title, data.isClosed, data.user, data.date, data.message, data.slug, data.isDeleted],
      function (err, res) {
        if (err) {
          console.log('thread_error = ', err);
          errors.sendSqlError(err, callback);
        } else {
          data.id = res.insertId;
         // console.log('tread_create_result =', data);
          callback(0, data);
        }
      }
    );
  }
}

module.exports = create;
