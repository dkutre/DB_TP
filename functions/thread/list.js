var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');

function getSQLforList(dataObject) {
  var sql = ' SELECT * FROM thread '

  if (dataObject.user) sql += ' WHERE (thread.userEmail = "' + dataObject.user + '") ';
  if (dataObject.forum) sql += ' WHERE (thread.forumShortname = "' + dataObject.forum + '") ';

  if (dataObject.since) sql += ' AND (thread.date >= "' + dataObject.since + '") ';

  if (dataObject.order !== 'asc') {
    dataObject.order = 'desc';
  }
  sql += ' ORDER BY thread.date ' + dataObject.order;

  if (dataObject.limit) {
    sql += ' LIMIT ' + dataObject.limit;
  }
  return sql;
}

function list(dataObject, responceCallback) {
  db.query(getSQLforList(dataObject), [],
    function(err, res) {
      if (err) err = helper.mysqlError(err.errno);
      if (err) responceCallback(err.code, err.message);
      else {
        res = res.map(function(node) {
          return views.thread(node, node.forumShortname, node.userEmail);
        });
        responceCallback(0, res);
      }
    });
}

module.exports = list;
