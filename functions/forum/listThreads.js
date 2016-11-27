var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;
var threadDetails = require('../thread/details')


function getSQLforlistThreads(dataObject) {
  var sql = ' SELECT id FROM thread ';
  sql += ' WHERE (thread.forumShortname = "' + dataObject.forum + '") ';
  if (dataObject.since)
    sql += ' AND (thread.date >= "' + dataObject.since + '") ';
  if (dataObject.order !== 'asc') {
    dataObject.order = 'desc';
  }
  sql += ' ORDER BY thread.date ' + dataObject.order;
  if (dataObject.limit) {
    sql += ' LIMIT ' + dataObject.limit;
  }
  return sql;
}

function listThreads(dataObject, responceCallback) {
  db.query(getSQLforlistThreads(dataObject), [], function (err, res) {
    if (err)
      err = helper.mysqlError(err.errno);
    if (err) responceCallback(err.code, err.message); else {
      res = res.map(function (node) {
        return function (callback) {
          threadDetails({
            thread: node.id,
            related: dataObject.related
          }, function (code, res) {
            callback(null, res);
          });
        }
      });
      async.parallel(res, function (err, res) {
        if (err) responceCallback(err.code, err.message); else {
          responceCallback(0, res);
        }
      });
    }
  });
}

module.exports = listThreads;
