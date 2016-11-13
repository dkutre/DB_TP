var errors = require('../errors');
var db = require('../connection');
var functions = require('../system_fucntions');


function create(data, callback) {
  if (!data.hasOwnProperty('parent')) {
    data.parent = '';
  }
  else if (data.parent === null) {
    data.parent = '';
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

  callback(0, "OK");
}

module.exports = create;
