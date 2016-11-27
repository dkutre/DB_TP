var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function getSQLforList(dataObject) {
  //проверить поля
  let sql = "SELECT date, dislikes, forumShortname, id, isApproved, isDeleted, isEdited, isHighlighted, isSpam, likes, message, parent, points, threadId, userEmail FROM post "

  if (dataObject.forum) sql += 'WHERE (forumShortname = "' + dataObject.forum + '") ';
  if (dataObject.thread) sql += 'WHERE (threadId = "' + dataObject.thread + '") ';

  if (dataObject.since) {
    sql += ' AND (date >= "' + dataObject.since + '") ';
  }

  if (dataObject.order !== 'asc') {
    dataObject.order = 'desc';
  }
  sql += ' ORDER BY date ' + dataObject.order;

  if (dataObject.limit) {
    sql += ' LIMIT ' + dataObject.limit;
  }
  return sql;
}

function postList(dataObject, responceCallback) {
  db.query(getSQLforList(dataObject), [],
    function (err, res) {
      if (err) err = helper.mysqlError(err.errno);
      if (err) responceCallback(err.code, err.message)
      else {
        res = res.map(function (node) {
          return views.post(node, node.forumShortname, node.threadId, node.userEmail);
        });
        responceCallback(0, res);
      }
    });
}

module.exports = postList;
