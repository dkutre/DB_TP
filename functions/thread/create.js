var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
var error = helper.errors;


function create(dataObject, responceCallback) {
  if (dataObject.isDeleted !== true) {
    dataObject.isDeleted = false;
  }
  if (!helper.checkFields(dataObject, ['forum', 'title', 'isClosed', 'user', 'date', 'message', 'slug'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  db.query('INSERT INTO thread (forumShortname, title, isClosed, userEmail, date, message, slug, isDeleted) ' +
    'values (?, ?, ?, ?, ?, ?, ?, ?)',
    [dataObject.forum, dataObject.title, dataObject.isClosed, dataObject.user, dataObject.date, dataObject.message, dataObject.slug, dataObject.isDeleted],
    function (err, res) {
      if (err) {
        err = helper.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        var resp = views.thread(dataObject, dataObject.forum, dataObject.user);
        resp.id = res.insertId;
        responceCallback(0, resp);
      }
    }
  );
}

module.exports = create;
